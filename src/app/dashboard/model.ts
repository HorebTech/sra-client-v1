
export interface FormGroupColumn {
    field: string;
    type: string;
    header: string;
    visible: boolean;
    required: boolean;
    optionLabel?: string;
    dropdownList?: any[];
    fileNb?: number;
    key?: string;
    readonly?: boolean;
}

export interface TableColumn {
    field: string;
    type: string;
    header: string;
    filter: boolean;
    sort?: boolean;
    optionLabel?: string;
    labelTrue?: string;
    labelFalse?: string;
    width?: string;
    compute?: boolean;
    editable?: boolean;
}

export interface DropdownSelector {
    field: string;
    dropdownEntries: any[];
}

export interface DropdownData {
    data?: Array<DropdownSelector>;
}

export interface MultiSelectSelector {
    field: string;
    optionLabel?: string;
    multiselectEntries: any[];
}

