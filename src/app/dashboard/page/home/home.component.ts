import { ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, Subscription, takeUntil } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';
import { PanneInterface } from '../../../models/Panne.model';
import { ChambreModel } from '../../../models/Chambre.model';
import { SalleInterface } from '../../../models/Salle.model';
import { PasseInterface } from '../../../models/Passe.model';
import { AuthResponse, Utilisateur } from '../../../models/User.model';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { convertirDate, getTodayDate } from '../../utils';
import { counterByMarque, getAllPannes, getAllPannesByDates, getAllPannesByDay, getPannesInRoom, getTopChambre } from '../../../store/Panne/Panne.action';
import { findCountedByMarque, findTopChambre, getGlobalPannes, getGlobalPannesByDates, getGlobalPannesByDay, getGlobalPannesInRoom } from '../../../store/Panne/Panne.selector';
import { getAllChambresEnNettoyages, getAllChambresPropres } from '../../../store/Chambre/Chambre.action';
import { findGlobalChambresEnNettoyage, findGlobalChambresPropres } from '../../../store/Chambre/Chambre.selector';
import { getAllSallesEnNettoyage, getAllSallesPropres } from '../../../store/Salle/Salle.action';
import { findGlobalSallesEnNettoyage, findGlobalSallesPropres } from '../../../store/Salle/Salle.selector';
import { getUtilisateurs } from '../../../store/User/User.action';
import { getUserlist } from '../../../store/User/User.Selectors';
import { userConnected } from '../../../store/Common/App.action';
import { getUserConnected } from '../../../store/Common/App.selector';
import { Router } from '@angular/router';
import { findCurrentPasses, findNewPasses } from '../../../store/Passe/Passe.action';
import { getCurrentPasses, getNewPasses } from '../../../store/Passe/Passe.selector';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
platformId = inject(PLATFORM_ID);
  @ViewChild('chatcontainer') chatContainerViewChild!: ElementRef;

    private unsubscribe$ = new Subject<void>();
  pannesParDates!: PanneInterface[];

  rangeDates: Date[] | undefined;



  panneChart: any;
  pannesOptions: any;
  noResult: boolean  = false;

  panneMarqueData: any;
  panneMarqueOptions: any;

  overviewChartData1: any;

  overviewChartData2: any;

  overviewChartData3: any;

  overviewChartData4: any;

  overviewChartOptions1: any;

  overviewChartOptions2: any;

  overviewChartOptions3: any;

  overviewChartOptions4: any;

  subscription!: Subscription;

  nosChambresPropres! : ChambreModel[];
  nosChambresEnNettoyages! : ChambreModel[];

  nosSallesPropres! : SalleInterface[];
  nosSallesEnNettoyages! : SalleInterface[];

  nouveauxPasses! : PasseInterface[];
  passesEnCours! : PasseInterface[];

  pannesByDay! : PanneInterface[];
  toutesLesPannes! : PanneInterface[];
  toutesLesPannesFiltre! : PanneInterface[];
  toutesLesPannesParNombre : any[] = [];
  toutesLesPannesParChambre : any[] = [];
  dateDuJour!: string;


  top3Chambre: any;

  countedByMarque!: string[];
  countedByNumber!: number[]

  nosAgents! : Utilisateur[];

      constructor(
       public layoutService: LayoutService,
      private store: Store,
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService,
        protected router: Router,
        private cd: ChangeDetectorRef,

      ) {
          this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.panneChartInit(),
                this.panneMarqueChart()
            });
      }
      
      tokens!: AuthResponse;
      userConnected!: AuthResponse;

    ngOnInit() {
        this.loadUserData();
        this.setupCharts();
        this.setOverviewColors();
    
        // Gérer l'utilisateur connecté
        this.store.select(getUserConnected).pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
          this.userConnected = item as AuthResponse;
          if (item?.role === 'Agent') {
            this.router.navigate(['/dashboard/agent']);
          } else {
            this.handleNonAgentRole();
          }
        });
        this.store.dispatch(getTopChambre());
      }
    
      ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }

      private loadUserData() {
        const userdata = localStorage.getItem('userdata');
        if (userdata) {
          this.tokens = JSON.parse(userdata) as AuthResponse;
          this.store.dispatch(userConnected({ nom: this.tokens.nom as string }));
        }
      }
    
      private handleNonAgentRole() {
        this.store.dispatch(counterByMarque());
        this.store.select(findCountedByMarque).pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: (data) => {
            this.countedByMarque = data.map(item => item.marque);
            this.countedByNumber = data.map(item => item.total);
            this.updatePanneMarqueChart();
          }
        });
    
        this.fetchData();
        this.fetchAdditionalData();
      }
    
      private fetchData() {

        this.store.select(findTopChambre).pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: (data: any[]) => {
            this.top3Chambre = data;
            if (data && data.length > 0) {
              this.toutesLesPannesParNombre = [];
              this.toutesLesPannesParChambre = [];

              data.forEach(item => {
                this.toutesLesPannesParNombre.push(item.nombreDePannes);
                this.toutesLesPannesParChambre.push(item.numeroChambre);
                console.log(this.toutesLesPannesParNombre);
                console.log(this.toutesLesPannesParChambre);
                
              });
              this.panneChartInit();
            }
          }
        });
      }
    
      private fetchAdditionalData() {
   
        this.store.dispatch(getAllChambresPropres({ etat: "Propre" }));
        this.store.select(findGlobalChambresPropres).pipe(takeUntil(this.unsubscribe$)).subscribe(
          chambres => this.nosChambresPropres = chambres
        );
    
        this.store.dispatch(getAllChambresEnNettoyages({ etat: "En cours" }));
        this.store.select(findGlobalChambresEnNettoyage).pipe(takeUntil(this.unsubscribe$)).subscribe(
          chambres => this.nosChambresEnNettoyages = chambres
        );
    
        this.store.dispatch(getAllSallesPropres({ etat: "Propre" }));
        this.store.select(findGlobalSallesPropres).pipe(takeUntil(this.unsubscribe$)).subscribe(
          salles => this.nosSallesPropres = salles
        );
    
        this.store.dispatch(getAllSallesEnNettoyage({ etat: "En cours" }));
        this.store.select(findGlobalSallesEnNettoyage).pipe(takeUntil(this.unsubscribe$)).subscribe(
          salles => this.nosSallesEnNettoyages = salles
        );
    
        this.store.dispatch(findNewPasses({ nom: "Nouveau" }));
        this.store.select(getNewPasses).pipe(takeUntil(this.unsubscribe$)).subscribe(
          passes => this.nouveauxPasses = passes
        );
    
        this.store.dispatch(findCurrentPasses({ nom: "En cours" }));
        this.store.select(getCurrentPasses).pipe(takeUntil(this.unsubscribe$)).subscribe(
          passes => this.passesEnCours = passes
        );
    
        this.store.dispatch(getAllPannesByDay({ date: this.dateDuJour }));
        this.store.select(getGlobalPannesByDay).pipe(takeUntil(this.unsubscribe$)).subscribe(
          pannes => this.pannesByDay = pannes
        );
    
        this.store.dispatch(getAllPannes());
        this.store.select(getGlobalPannes).pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: (data) => {
            this.toutesLesPannes = data;
            this.toutesLesPannesFiltre = data;
            this.noResult = false;
          }
        });
    
        this.store.dispatch(getUtilisateurs());
        this.store.select(getUserlist).pipe(takeUntil(this.unsubscribe$)).subscribe(
          users => this.nosAgents = users
        );
      }
    
      private setupCharts() {
        this.overviewChartData1 = this.createOverviewChartData([50, 64, 32, 24, 18, 27, 20, 36, 30]);
        this.overviewChartOptions1 = this.createOverviewChartOptions();
        this.overviewChartData2 = this.createOverviewChartData([11, 30, 52, 35, 39, 20, 14, 18, 29]);
        this.overviewChartOptions2 = this.createOverviewChartOptions();
        this.overviewChartData3 = this.createOverviewChartData([20, 29, 39, 36, 45, 24, 28, 20, 15]);
        this.overviewChartOptions3 = this.createOverviewChartOptions();
        this.overviewChartData4 = this.createOverviewChartData([30, 39, 50, 21, 33, 18, 10, 24, 20]);
        this.overviewChartOptions4 = this.createOverviewChartOptions();
      }
    
      private createOverviewChartData(data: number[]): any {
        return {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
          datasets: [{
            data,
            borderColor: ['#4DD0E1'],
            backgroundColor: ['rgba(77, 208, 225, 0.8)'],
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }]
        };
      }
    
      private createOverviewChartOptions(): any {
        return {
          plugins: { legend: { display: false } },
          scales: { y: { display: false }, x: { display: false } },
          tooltips: { enabled: false },
          elements: { point: { radius: 0 } }
        };
      }
    

    onChatKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            const message = (<HTMLInputElement>event.currentTarget).value;

            (<HTMLInputElement>event.currentTarget).value = '';

            const el = this.chatContainerViewChild.nativeElement;
            setTimeout(() => {
                el.scroll({
                    top: el.scrollHeight,
                    behavior: 'smooth',
                });
            }, 1);
        }
    }

    panneMarqueChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
            
            this.panneMarqueData = {
                labels: this.countedByMarque,
                datasets: [
                    {
                        label: 'Nombre de pannes',
                        backgroundColor: 'rgba(128, 128, 128, 0.7)', // Gris avec transparence
                        hoverBackgroundColor: 'rgba(128, 128, 128, 1)', // Plein au hover
                        hoverBorderColor: 'rgba(128, 128, 128, 1)', // Bordure pleine au hover
                        borderWidth: 0, // Taille de la bordure
                        borderRadius: 5, // Arrondi des coins des bandes
                        barPercentage: 0.6, // Proportion de largeur des bandes
                        categoryPercentage: 0.5, // Espacement entre les bandes
                        data: this.countedByNumber
                    }
                ]
            };
            
            this.panneMarqueOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            display: false // Désactive les lignes verticales
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder // Lignes horizontales visibles
                        }
                    }
                }
            };
            
            this.cd.markForCheck()
        }
    }

    updatePanneMarqueChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        
        this.panneMarqueData = {
            labels: this.countedByMarque, // Labels dynamiques
            datasets: [
                {
                    label: 'Nombre de problèmes techniques par Marque',
                    backgroundColor: 'rgba(128, 128, 128, 0.7)',
                    hoverBackgroundColor: 'rgba(128, 128, 128, 1)',
                    hoverBorderColor: 'rgba(128, 128, 128, 1)',
                    borderWidth: 0,
                    borderRadius: 5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    data: this.countedByNumber // Données dynamiques
                }
            ]
        };
        
        this.panneMarqueOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
        
        this.cd.markForCheck(); // Assurez-vous que les changements sont détectés
    }

    panneChartInit() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
    
            // Initialisation de la Map pour regrouper les pannes par numéro de chambre
            const groupedPannes = new Map<string, number>();
    
            // Nettoyage et traitement des données avant regroupement
            const cleanedData = this.toutesLesPannesParChambre.map((chambre, index) => ({
                chambre,
                nombre: this.toutesLesPannesParNombre[index] || 0
            })).filter(item => item.chambre && !isNaN(item.nombre));
    
            // Debugging : Affiche les données nettoyées pour vérifier leur cohérence
            // console.log('Données nettoyées :', cleanedData);
    
            // Regroupement des données par chambre
            cleanedData.forEach(item => {
                if (groupedPannes.has(item.chambre)) {
                    groupedPannes.set(item.chambre, groupedPannes.get(item.chambre)! + item.nombre);
                } else {
                    groupedPannes.set(item.chambre, item.nombre);
                }
            });
    
            // Conversion des données regroupées en tableaux
            const chambresUniques = Array.from(groupedPannes.keys());
            const nombresRegroupés = Array.from(groupedPannes.values());
    
            // Debugging : Vérification des données regroupées
            // console.log('Grouped Pannes Map:', groupedPannes);
            // console.log('Chambres uniques:', chambresUniques);
            // console.log('Nombres regroupés:', nombresRegroupés);
    
            // Configuration du graphique
            this.panneChart = {
                labels: chambresUniques,
                datasets: [
                    {
                        data: nombresRegroupés,
                        backgroundColor: chambresUniques.map((_, index) =>
                            documentStyle.getPropertyValue(['--p-cyan-500', '--p-orange-500', '--p-gray-500'][index % 3])
                        ),
                        hoverBackgroundColor: chambresUniques.map((_, index) =>
                            documentStyle.getPropertyValue(['--p-cyan-400', '--p-orange-400', '--p-gray-400'][index % 3])
                        )
                    }
                ]
            };
    
            // Options pour le graphique
            this.pannesOptions = {
                cutout: '60%', // Affiche un graphique en anneau
                plugins: {
                    legend: {
                        labels: {
                            color: textColor // Couleur des labels
                        }
                    }
                }
            };
    
            // Indique au détecteur de changement de mettre à jour le composant
            this.cd.markForCheck();
        }
    }

    setOverviewColors() {
        const { pinkBorderColor, pinkBgColor, tealBorderColor, tealBgColor, orangeBgColor, orangeBorderColor, roseBorderColor, roseBgColor, rougeBorderColor, rougeBgColor } =
            this.getOverviewColors();

        this.overviewChartData1.datasets[0].borderColor[0] = tealBorderColor;
        this.overviewChartData1.datasets[0].backgroundColor[0] = tealBgColor;

        this.overviewChartData2.datasets[0].borderColor[0] = orangeBorderColor;
        this.overviewChartData2.datasets[0].backgroundColor[0] = orangeBgColor;

        this.overviewChartData3.datasets[0].borderColor[0] = roseBorderColor;
        this.overviewChartData3.datasets[0].backgroundColor[0] = roseBgColor;

        this.overviewChartData4.datasets[0].borderColor[0] = rougeBorderColor;
        this.overviewChartData4.datasets[0].backgroundColor[0] = rougeBgColor;
    }

    getOverviewColors() {
        const isLight = true;
        return {
            pinkBorderColor: isLight ? '#E91E63' : '#EC407A',
            pinkBgColor: isLight ? '#F48FB1' : '#F8BBD0',
            tealBorderColor: isLight ? '#009688' : '#26A69A',
            tealBgColor: isLight ? '#80CBC4' : '#B2DFDB',
            orangeBorderColor: isLight ? '#dbcc23' : '#dbcc23',
            orangeBgColor: isLight ? '#ffed29' : '#dbcc23',
            roseBorderColor: isLight ? '#458018' : '#458018',
            roseBgColor: isLight ? '#89f336' : '#89f336',
            rougeBorderColor: isLight ? '#9b1313' : '#9b1313',
            rougeBgColor: isLight ? '#cd1c18' : '#cd1c18'
        };
    }

    gtPannesOptions() {
        const textColor =
            getComputedStyle(document.body).getPropertyValue('--text-color') ||
            'rgba(0, 0, 0, 0.87)';
        const gridLinesColor =
            getComputedStyle(document.body).getPropertyValue(
                '--surface-border'
            ) || 'rgba(0, 46, 139, 1)';
        const fontFamily = getComputedStyle(document.body).getPropertyValue(
            '--font-family'
        );

        return {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        fontFamily,
                        color: textColor,
                    },
                },
            },
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        fontFamily,
                        color: textColor,
                    },
                    grid: {
                        color: gridLinesColor,
                    },
                },
                x: {
                    ticks: {
                        fontFamily,
                        color: textColor,
                    },
                    grid: {
                        color: gridLinesColor,
                    },
                },
            },
        };
    }

    actualiserChambresPropres(event: any) {
        this.store.dispatch(getAllChambresPropres({etat: "Propre"}));
        this.store.dispatch(getAllChambresEnNettoyages({etat: "En cours"}));
    }

    actualiserSallesPropres(event: any) {
        this.store.dispatch(getAllSallesPropres({etat: "Propre"}));
        this.store.dispatch(getAllSallesEnNettoyage({etat: "En cours"}));
    }

    actualiserNouveauxPasses(event: any) {
        this.store.dispatch(findNewPasses({nom: "Nouveau"}));
        this.store.dispatch(findCurrentPasses({nom: "En cours"}));
    }

    actualiserLesPannes(event: any) {
        this.store.dispatch(getAllPannesByDay({date: this.dateDuJour}));
        this.store.dispatch(getAllPannes());
    }

    searchPannes(){
        if(this.rangeDates == undefined) {
            this.messageService.add({ severity: 'error', summary: 'Oups !', detail: 'Veuillez choisir 2 dates !' });
        } else {
            const dateDebut = convertirDate(this.rangeDates![0]);
            const dateFin = convertirDate(this.rangeDates![1]);
            if (dateDebut == "1-01-1970 0:00" || dateFin == "1-01-1970 0:00"){
                this.messageService.add({ severity: 'error', summary: 'Oups !', detail: 'Veuillez choisir 2 dates !' });
            } else {
                this.store.dispatch(getAllPannesByDates({dateDebut:dateDebut, dateFin:dateFin}));
                this.store.select(getGlobalPannesByDates).subscribe({
                    next: (data) => {
                        this.toutesLesPannesFiltre = data;
                        if(data.length == 0) {
                            this.noResult = true;
                        } else {
                            this.noResult = false;
                        }
                    }
                });
            }
        }
    }

}
