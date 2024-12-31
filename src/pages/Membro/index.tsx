import { Box, Grid2, TextField } from "@mui/material";
import { TableComponent } from "../../shared/components";
import Service from "../../shared/service";
import { useState, useEffect } from "react";
import { EditModal } from "./EditModal";
import { TableData } from "./type/membro";
import { CollapsePaper } from "../../shared/components/Colapse";
import { AddMembros } from "./AddMembros";
import { useLoader } from "../../shared/contexts/LoaderProvider";
import { useSnackbar } from "../../shared/contexts/SnackbarProvider";

interface TableColumn {
    id: string;
    label: string;
    props?: { align: 'left' | 'right' | 'center' };
}

const headers: TableColumn[] = [
    { id: 'id', label: 'ID', props: { align: 'left' } },
    { id: 'name', label: 'Nome', props: { align: 'left' } },
    { id: 'nome_crente', label: 'Nome de crente', props: { align: 'left' } },
    { id: 'telefone_celular', label: 'Telefone', props: { align: 'right' } },
    { id: 'whatsapp', label: 'WhatsApp', props: { align: 'right' } },
];

export default function Membro() {
    const [data, setData] = useState<TableData[]>([]);
    const [filteredData, setFilteredData] = useState<TableData[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TableData | null>(null);
    const { showLoader, hideLoader } = useLoader();
    const { showMessage } = useSnackbar();

    const handleGetMembros = async () => {
        setLoading(true);
        try {
            showLoader("Carregando dados...");
            const res = await Service.get('membros');
            setData(res.data);
            setFilteredData(res.data); // Inicia com todos os dados
            hideLoader();
        } catch (error) {
            hideLoader();
            console.error("Erro ao buscar membros:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetMembros();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredData(
            data.filter(
                (item) =>
                    item.name.toLowerCase().includes(term) ||
                    item.nome_crente?.toLowerCase().includes(term)
            )
        );
    };

    const handleDelete = async (id: string) => {
        try {
            showLoader("Desativando membro...");
            await Service.delete(id, "membros/destroy");

            // Remove o membro da tabela (estado local)
            setData((prev) => prev.filter((row) => row.id !== id));
            setFilteredData((prev) => prev.filter((row) => row.id !== id));

            hideLoader();
            showMessage("Membro desativado com sucesso.", "success");
        } catch (error) {
            hideLoader()
            showMessage("Erro ao desativar membro.", "error");
            console.error(error);
        }
    };


    const handleEdit = (id: string) => {
        const member = data.find((item) => item.id === id);
        if (member) {
            setSelectedMember(member);
            setModalOpen(true);
        }
    };

    const handleSave = (updatedMember: TableData) => {
        setData((prev) =>
            prev.map((item) => (item.id === updatedMember.id ? updatedMember : item))
        );
        setFilteredData((prev) =>
            prev.map((item) => (item.id === updatedMember.id ? updatedMember : item))
        );
    };

    return (
        <Box padding={1}>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12 }}>
                    <CollapsePaper
                        title="Bem Vindo ao sistema de disparo de whatsapp Cpz"
                        description="Clique para cadastrar novo contato."
                    >
                        <AddMembros handleGetMembros={handleGetMembros} />
                    </CollapsePaper>
                </Grid2>



                <Grid2 size={{ xs: 12 }} padding={1}>
                    <Box padding={2} width={350}>
                        <TextField
                            label="Pesquisar"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Digite o nome ou nome de crente"
                        />
                    </Box>
                    <TableComponent
                        headers={headers}
                        data={filteredData}
                        loading={loading}
                        handlerEditarAction={handleEdit}
                        handlerDeletarAction={handleDelete}                      
                        labelCaption="Nenhum membro encontrado."
                        labelTable="Lista de Membros"
                    />
                </Grid2>
            </Grid2>
            {selectedMember && (
                <EditModal
                    open={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    handleSave={handleSave}
                    memberData={selectedMember}
                />
            )}
        </Box>
    );
}
