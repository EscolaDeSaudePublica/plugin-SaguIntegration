$(() => {
    $('[export-students-btn]').on('click', function() {
        const remodalInstance = $('[data-remodal-id=modal-exported-students]').remodal()
        remodalInstance.open()

        $.get(`/sagu-integration/selectedStudentData/${this.dataset.opportunityId}`, students => {
            $('[selected-students-table-wrapper]').html(renderSelectedStudentsTable(students))
        })
    })
})

const renderSelectedStudentsTable = students => {
    return `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Inscrição</th>
                    <th>Nome</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${students.map(student => {
                    return `
                        <tr>
                            <td>${student.registration_number}</td>
                            <td>${student.data.nome}</td>
                            <td>${handleExportedStudentStatus(student.status)}</td>
                        </tr>
                    `
                }).join('')}
            </tbody>
        </table>
    `
}

const handleExportedStudentStatus = status => {
    switch(status) {
        case 400:
            return '<span>Já possui cadastro no Sagu</span>'
        case 500:
            return '<span>Não foi possível exportar pessoa</span>'
        default:
            return '<span>Exportado com sucesso</span>'
    }
}
