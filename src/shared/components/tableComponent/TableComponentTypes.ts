export interface EnhancedTableToolbarProps {
    numSelected: number;
    labelTable: string;
    handlerDelete?: () => void;
    Action?: React.FC;
  }
  
  export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    request?: boolean;
    rows: any[];
  }
  
 // TableComponentTypes.ts
export interface TableComponentProps {
    headers: { id: string; label: string; props?: any }[];
    data: any[];
    labelCaption: string;
    labelTable: string;
    loading?: boolean;
    handlerEditarAction: (row: any) => void;
    handlerDelete?: (id: string) => void; 
    // Propriedades opcionais
    handlerAtivoAction?: (row: any) => void;
    request?: boolean;
    handlerRequest?: (page: number, rowsPerPage: number) => Promise<any>;
    setData?: (data: any[]) => void;
    selected?: any[];
    handleClickSelected?: (event: React.MouseEvent<HTMLTableRowElement>, row: any) => void;
    handleSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>, selectedName: string) => void;
    selectedName?: string;

    handlerDeletarAction?: (row: any) => void;
    handlerDetalhesAction?: (row: any) => void;
    ActionSelect?: React.FC;
    qdtPage?: number;
    status?: string;
    statusLabelTrue?: string;
    statusLabelFalse?: string;
  }
  
  