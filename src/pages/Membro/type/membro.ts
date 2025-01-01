export interface TableData {
    id: string;
    name: string;
    nome_crente?: string;
    whatsapp: string; 
    telefone_celular: string;
    grupos: { id: number; nome: string }[]; 
}