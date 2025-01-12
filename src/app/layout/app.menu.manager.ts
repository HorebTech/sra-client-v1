export const AgentMenu: any[] = [
    {
        label: 'DASHBOARD',
        icon: 'pi pi-th-large',
        items: [
            {
                label: 'Accueil',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/dashboard/agent']
            },
            {
                label: 'Profil',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/dashboard/profil']
            }

        ]
    }
];

export const AdminMenu: any[] = [
    {
        label: 'DASHBOARD',
        icon: 'pi pi-th-large',
        items: [
            {
                label: 'Accueil',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/dashboard']
            },
        ]
    },
    {
        label: 'GESTION',
        icon: 'pi pi-th-large',
        items: [
            {
                label: 'Chambres',
                icon: 'pi pi-fw pi-sitemap',
                routerLink: ['/dashboard/chambres']
            },
            {
                label: 'Salles',
                icon: 'pi pi-fw pi-sitemap',
                routerLink: ['/dashboard/salles']
            },
            {
                label: 'Tâches',
                icon: 'pi pi-sync',
                routerLink: ['/dashboard/taches']
            },
            {
                label: 'Nettoyages',
                icon: 'pi pi-eraser',
                routerLink: ['/dashboard/nettoyages']
            },
            {
                label: 'Passes',
                icon: 'pi pi-fw pi-credit-card',
                routerLink: ['/dashboard/passes']
            },
            {
                label: 'Agents',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/dashboard/utilisateur']
            },
            {
                label: 'Problèmes techniques',
                icon: 'pi pi-fw pi-wrench',
                routerLink: ['/dashboard/pannes']
            },
            {
                label: 'Objets trouvés',
                icon: 'pi pi-fw pi-box',
                routerLink: ['/dashboard/objets']
            },
            
        ]
    },
    {
        label: 'PARAMETRES',
        icon: 'pi pi-th-large',
        items: [
            {
                label: 'Profil',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/dashboard/profil']
            },


        ]
    }
];