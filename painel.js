// Add event listeners to buttons
// ...existing code...
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // For buttons in a group
        const group = this.closest('.btn-group');
        if (group) {
            // If it's not a red button, toggle active state
            if (!this.classList.contains('btn-red')) {
                group.querySelectorAll('.btn:not(.btn-red)').forEach(btn => {
                    btn.classList.remove('btn-green');
                    btn.classList.add('btn-gray');
                });
                this.classList.remove('btn-gray');
                this.classList.add('btn-green');
            }
        }
        
        // Special handling for red buttons
        if (this.classList.contains('btn-red')) {
            alert('Ação: ' + this.textContent);
        }
        
        // Special handling for photo/comments buttons
        if (this.textContent.trim() === 'Fotos' || this.textContent.trim() === 'Comentários') {
            const header = this.closest('.preview-header');
            if (header) {
                header.querySelectorAll('.btn').forEach(btn => {
                    btn.classList.remove('btn-green');
                    btn.classList.add('btn-gray');
                });
                this.classList.remove('btn-gray');
                this.classList.add('btn-green');
            }
        }
    });
});

// Add event listeners to number inputs
document.querySelectorAll('.number-box input').forEach(input => {
    // When input gets focus, select all text
    input.addEventListener('focus', function() {
        this.select();
    });
    
    input.addEventListener('input', function() {
        // Allow only numbers
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Auto-move to next input
        if (this.value.length === 1) {
            const nextInput = this.parentElement.previousElementSibling?.querySelector('input');
            if (nextInput) nextInput.focus();
        }
    });
    
    // Handle Enter key to go to previous input
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const prevInput = this.parentElement.previousElementSibling?.querySelector('input');
            if (prevInput) prevInput.focus();
        }
        // Handle backspace to go to next input when empty
        else if (e.key === 'Backspace' && this.value.length === 0) {
            const nextInput = this.parentElement.nextElementSibling?.querySelector('input');
            if (nextInput) nextInput.focus();
        }
    });
});

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const editForm = document.getElementById('editForm');
const btnExibir = document.getElementById('btnExibir');
const btnMinimizar = document.getElementById('btnMinimizar');
const btnEditar = document.getElementById('btnEditar');
const modalContent = document.querySelector('.modal-content');

// Segundo modal
const modal2 = document.getElementById('imageModal2');
const modalImage2 = document.getElementById('modalImage2');
const editForm2 = document.getElementById('editForm2');
const btnExibir2 = document.getElementById('btnExibir2');
const btnMinimizar2 = document.getElementById('btnMinimizar2');
const btnEditar2 = document.getElementById('btnEditar2');
const modalContent2 = document.querySelector('.modal-content-dois');

// Função para exibir os dados dos clientes selecionados no modal como divs
// function exibirDadosClientesSelecionados() {
//     const checkboxesSelecionados = document.querySelectorAll('#batidasTable tbody input[type="checkbox"]:checked');
//     const modalContent = document.querySelector('.modal-content');

//     // Limpar conteúdo anterior do modal
//     modalContent.innerHTML = '';

//     if (checkboxesSelecionados.length === 0) {
//         modalContent.innerHTML = '<p>Nenhum cliente selecionado.</p>';
//         return;
//     }

//     // Criar um container para os dados
//     const container = document.createElement('div');
//     container.classList.add('container-cliente-info');
//     // container.style.display = 'flex';
//     // container.style.flexDirection = 'column';
//     // container.style.gap = '10px';
//     let cont = 0;
//     checkboxesSelecionados.forEach(checkbox => {
//         cont++;
//         const linha = checkbox.closest('tr');
//         const dadosCliente = linha.querySelectorAll('td');

//         const razaoSocial = dadosCliente[1]?.textContent.trim() || '';
//         const nomeFantasia = dadosCliente[2]?.textContent.trim() || '';
//         const nfCarne = dadosCliente[4]?.textContent.trim() || '';
//         const cidadeUf = dadosCliente[6]?.textContent.trim() || '';

//         const clienteDiv = document.createElement('div');
//         // clienteDiv.classList.add('cliente-info');
//         // clienteDiv.style.border = '1px solid #ddd';
//         // clienteDiv.style.padding = '10px';
//         // clienteDiv.style.borderRadius = '5px';
//         // clienteDiv.style.backgroundColor = '#f9f9f9';

//         clienteDiv.innerHTML = `
//             <h4 class="title">${cont}º batida</h4>
//             <div class="cliente-info">
//             <p><strong>Razão Social:</strong> ${razaoSocial}</p>
//             <p><strong>Nome Fantasia:</strong> ${nomeFantasia}</p>
//             <p><strong>NF/Carnê:</strong> ${nfCarne}</p>
//             <p><strong>Cidade/UF:</strong> ${cidadeUf}</p>
//         </div>`;
//         console.log("oi");
//         container.appendChild(clienteDiv);
//     });

//     modalContent.appendChild(container);
// }

// Função para exibir os dados dos clientes selecionados no segundo modal como divs
// function exibirDadosClientesSelecionadosModal2() {
//     const checkboxesSelecionados = document.querySelectorAll('#batidasTable tbody input[type="checkbox"]:checked');
//     const modalContent2 = document.querySelector('.modal-content-dois');

//     // Limpar conteúdo anterior do modal
//     modalContent2.innerHTML = '';

//     if (checkboxesSelecionados.length === 0) {
//         modalContent2.innerHTML = '<p>Nenhum cliente selecionado.</p>';
//         return;
//     }

//     // Criar um container para os dados
//     const container = document.createElement('div');
//     container.classList.add('container-cliente-info');
//     let cont = 0;
//     checkboxesSelecionados.forEach(checkbox => {
//         cont++;
//         const linha = checkbox.closest('tr');
//         const dadosCliente = linha.querySelectorAll('td');

//         const razaoSocial = dadosCliente[1]?.textContent.trim() || '';
//         const nomeFantasia = dadosCliente[2]?.textContent.trim() || '';
//         const nfCarne = dadosCliente[4]?.textContent.trim() || '';
//         const cidadeUf = dadosCliente[6]?.textContent.trim() || '';

//         const clienteDiv = document.createElement('div');
//         clienteDiv.innerHTML = `
//             <h4 class="title">${cont}º batida</h4>
//             <div class="cliente-info">
//             <p><strong>Razão Social:</strong> ${razaoSocial}</p>
//             <p><strong>Nome Fantasia:</strong> ${nomeFantasia}</p>
//             <p><strong>NF/Carnê:</strong> ${nfCarne}</p>
//             <p><strong>Cidade/UF:</strong> ${cidadeUf}</p>
//         </div>`;

//         container.appendChild(clienteDiv);
//     });
//     modalContent2.appendChild(container);
// }

// Função para exibir os dados dos clientes selecionados no primeiro modal (Milhar)
function exibirDadosClientesMilhar() {
    const checkboxesSelecionados = document.querySelectorAll('#batidasTable tbody input[type="checkbox"]:checked');
    const modalContent = document.querySelector('.modalcontainer1');

    // Limpar conteúdo anterior do modal
    modalContent.innerHTML = '';

    const clientesMilhar = Array.from(checkboxesSelecionados).filter(checkbox => {
        const linha = checkbox.closest('tr');
        const nfCell = linha.querySelector('td.nf');
        return nfCell && nfCell.querySelector('.nf-milhar');
    });

    if (clientesMilhar.length === 0) {
        modalContent.innerHTML = '<p>Nenhum cliente do tipo Milhar selecionado.</p>';
        return;
    }

    const container = document.createElement('div');
    container.classList.add('container-cliente-info');
    let cont = 0;
    clientesMilhar.forEach(checkbox => {
        cont++;
        const linha = checkbox.closest('tr');
        const dadosCliente = linha.querySelectorAll('td');

        const razaoSocial = dadosCliente[1]?.textContent.trim() || '';
        const nomeFantasia = dadosCliente[2]?.textContent.trim() || '';
        const nfCarne = dadosCliente[4]?.textContent.trim() || '';
        const cidadeUf = dadosCliente[6]?.textContent.trim() || '';
        let msg = 'Ganhador';
        let classe = '';
        const clienteDiv = document.createElement('div');
        if(clientesMilhar.length > 1){
            msg = `${cont}º batida`;
            classe = 'borda';
            // clienteDiv.classList.add('borda');
        }
        clienteDiv.innerHTML = `
            <h4 class="title">${msg}</h4>
            <div class="cliente-info ${classe}">
            <h5>${razaoSocial}</h5>
            <p>${cidadeUf}</p>
        </div>`;
        if(clientesMilhar.length <= 4){
            container.appendChild(clienteDiv);
        }
    });
    
    modalContent.appendChild(container);
}

// Função para exibir os dados dos clientes selecionados no segundo modal (Centena)
function exibirDadosClientesCentena() {
    const checkboxesSelecionados = document.querySelectorAll('#batidasTable tbody input[type="checkbox"]:checked');
    const modalContent2 = document.querySelector('.modal-content-dois');

    // Limpar conteúdo anterior do modal
    modalContent2.innerHTML = '';

    const clientesCentena = Array.from(checkboxesSelecionados).filter(checkbox => {
        const linha = checkbox.closest('tr');
        const nfCell = linha.querySelector('td.nf');
        return nfCell && nfCell.querySelector('.nf-centena');
    });

    if (clientesCentena.length === 0) {
        modalContent2.innerHTML = '<p>Nenhum cliente do tipo Centena selecionado.</p>';
        return;
    }

    const container = document.createElement('div');
    container.classList.add('container-cliente-info');
    let cont = 0;
    clientesCentena.forEach(checkbox => {
        cont++;
        const linha = checkbox.closest('tr');
        const dadosCliente = linha.querySelectorAll('td');

        const razaoSocial = dadosCliente[1]?.textContent.trim() || '';
        const nomeFantasia = dadosCliente[2]?.textContent.trim() || '';
        const nfCarne = dadosCliente[4]?.textContent.trim() || '';
        const cidadeUf = dadosCliente[6]?.textContent.trim() || '';
        let msg = 'Ganhador';
        let classe = '';
        const clienteDiv = document.createElement('div');
        if(clientesCentena.length > 1){
            msg = `${cont}º batida`;
            classe = 'borda';
            // clienteDiv.classList.add('borda');
        }
        clienteDiv.innerHTML = `
            <h4 class="title">${msg}</h4>
            <div class="cliente-info ${classe}">
            <h5>${razaoSocial}</h5>
            <p>${cidadeUf}</p>
        </div>`;
        if(clientesCentena.length <= 4){
            container.appendChild(clienteDiv);
        }
    });

    modalContent2.appendChild(container);
}

// Open modal when clicking on the 1º Sorteio image
document.getElementById('primeiro-sorteio-img').addEventListener('click', function() {
    exibirDadosClientesMilhar(); // Atualizar os dados no primeiro modal
    modal.style.display = 'flex';

    // Verificar se mais de um ganhador do tipo "Milhar" foi selecionado
    const checkboxesSelecionados = document.querySelectorAll('#batidasTable tbody input[type="checkbox"]:checked');
    let countMilhar = 0;

    checkboxesSelecionados.forEach(checkbox => {
        const linha = checkbox.closest('tr');
        const dadosCliente = linha.querySelectorAll('td');

        // Verificar se o cliente é do tipo "Milhar" pelo span com a classe 'nf-milhar'
        if (dadosCliente[4].querySelector('.nf-milhar')) {
            countMilhar++;
        }
    });

    // Alterar o background-image do modal-content com base na quantidade de ganhadores do tipo "Milhar"
    if(countMilhar >= 5) {
        modalContent.style.backgroundImage = "url('Roleta.png')"; // Imagem para nenhum ganhador da milhar
        modalContent.style.backgroundSize = 'cover';
    }
    if (countMilhar > 1) {
        modalContent.style.backgroundImage = "url('Bola-Maior-Milhar.jpg')";
        modalContent.style.backgroundSize = 'cover';
    } if (countMilhar === 1) {
        modalContent.style.backgroundImage = "url('Ganhador-Milhar.jpg')"; // Imagem para um único ganhador da milhar
        modalContent.style.backgroundSize = 'cover';
    }
     if(countMilhar === 0) {
        modalContent.style.backgroundImage = '';
    }
});
// Segundo modal
document.getElementById('primeiro-sorteio-img-dois').addEventListener('click', function() {
    exibirDadosClientesCentena(); // Atualizar os dados no segundo modal
    modal2.style.display = 'flex';

    // Verificar se mais de um ganhador do tipo "Centena" foi selecionado
    const checkboxesSelecionados = document.querySelectorAll('#batidasTable tbody input[type="checkbox"]:checked');
    let countCentena = 0;

    checkboxesSelecionados.forEach(checkbox => {
        const linha = checkbox.closest('tr');
        const dadosCliente = linha.querySelectorAll('td');

        // Verificar se o cliente é do tipo "Centena" pelo span com a classe 'nf-centena'
        if (dadosCliente[4].querySelector('.nf-centena')) {
            countCentena++;
        }
    });

    // Alterar o background-image do modal-content-dois com base na quantidade de ganhadores do tipo "Centena"
    if (countCentena > 1) {
        modalContent2.style.backgroundImage = "url('Bola-Maior-Centena.jpg')";
        modalContent2.style.backgroundSize = 'cover';
    } if(countCentena > 4) {
        modalContent2.style.backgroundImage = "url('Roleta.png')"; // Imagem para nenhum ganhador da centena
        modalContent2.style.backgroundSize = 'cover';
    }
    if (countCentena === 1) {
        modalContent2.style.backgroundImage = "url('Ganhador-Centena.jpg')"; // Imagem para um único ganhador da centena
        modalContent2.style.backgroundSize = 'cover';
    } if(countCentena === 0) {
        modalContent2.style.backgroundImage = '';
    }
});



// Close modal when clicking outside of it
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        editForm.style.display = 'none';
    }
});

// Minimize button closes the modal
btnMinimizar.addEventListener('click', function() {
    modal.style.display = 'none';
    editForm.style.display = 'none';
});

// Exibir button action
btnExibir.addEventListener('click', function() {
    alert('Exibindo na TV');
});

// Editar button toggles the edit form
btnEditar.addEventListener('click', function() {
    if (editForm.style.display === 'block') {
        editForm.style.display = 'none';
        this.textContent = 'Editar';
    } else {
        editForm.style.display = 'block';
        this.textContent = 'Editar';
    }
});

// Salvar button functionality
document.getElementById('btnSalvar').addEventListener('click', function() {
    alert('Alterações salvas com sucesso!');
    // Here you would typically update the data in the backend
    // For now, we'll just hide the form
    editForm.style.display = 'none';
});

// Salvar form2
document.getElementById('btnSalvar2').addEventListener('click', function() {
    alert('Alterações salvas com sucesso!');
    // Here you would typically update the data in the backend
    // For now, we'll just hide the form
    editForm2.style.display = 'none';
});
document.getElementById('fechar2').addEventListener('click', function() {
    editForm2.style.display = 'none';
});
// Fechar o segundo modal ao clicar fora dele
modal2.addEventListener('click', function(e) {
    if (e.target === modal2) {
        modal2.style.display = 'none';
        // editForm2.style.display = 'none';
    }
});

// Minimize button closes the second modal
btnMinimizar2.addEventListener('click', function() {
    modal2.style.display = 'none';
    editForm2.style.display = 'none';
});

// Exibir button action for the second modal
btnExibir2.addEventListener('click', function() {
    alert('Exibindo na TV (Modal 2)');
});

// Editar button toggles the edit form for the second modal
btnEditar2.addEventListener('click', function() {
    if (editForm2.style.display === 'block') {
        editForm2.style.display = 'none';
        this.textContent = 'Editar';
    } else {
        editForm2.style.display = 'block';
        this.textContent = 'Editar';
    }
});

// Adjust table heights based on available space
function adjustTableHeights() {
    const tablesContainer = document.querySelector('.tables-container');
    const tableSections = document.querySelectorAll('.table-section');
    
    if (tableSections.length === 2) {
        const availableHeight = tablesContainer.clientHeight;
        const firstTableHeight = Math.floor(availableHeight * 0.4);
        const secondTableHeight = availableHeight - firstTableHeight - 30; // 30px for margins
        
        tableSections[0].style.height = firstTableHeight + 'px';
        tableSections[1].style.height = secondTableHeight + 'px';
    }
}

// Radio button handling for Razão Social / Nome Fantasia
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // Get the client number from the radio name (cliente1, cliente2, etc.)
        const clientNum = this.name.replace('cliente', '');
        const isRazao = this.id.includes('razao');
        
        // Get the corresponding row
        const row = this.closest('tr');
        
        // Update the display based on selection
        if (row) {
            if (isRazao) {
                console.log(`Cliente ${clientNum}: Mostrando Razão Social`);
            } else {
                console.log(`Cliente ${clientNum}: Mostrando Nome Fantasia`);
            }
        }
    });
});

// Call on load and resize
window.addEventListener('load', adjustTableHeights);
window.addEventListener('resize', adjustTableHeights);


// --- FILTRO DE TABELAS ---
function getInputNumber() {
    // Pega os valores dos inputs de número
    return Array.from(document.querySelectorAll('.number-box input'))
        .map(input => input.value.trim())
        .join('');
}

function filterPossibilidadesAndMoveToBatidas() {
    const inputNum = getInputNumber();
    // console.log('Números digitados aqui:', inputNum);
    const possibilidadesTable = document.querySelectorAll('.table-section')[1].querySelector('tbody');
    const batidasTable = document.querySelectorAll('.table-section')[0].querySelector('tbody');

    // Clear the Batidas table
    batidasTable.innerHTML = '';

    // If no input, hide all rows in Possibilidades
    if (!inputNum || inputNum.length === 0) {
        possibilidadesTable.querySelectorAll('tr').forEach(tr => {
            tr.style.display = 'none';
        });
        return;
    }

    // Track rows already added to Batidas to avoid duplication
    const addedRows = new Set();
    // Iterate over Possibilidades table rows
    possibilidadesTable.querySelectorAll('tr').forEach(tr => {
        const tds = tr.querySelectorAll('td');
        const nfCell = tds[4];
        if (!nfCell) return;
        const nfText = nfCell.textContent.replace(/^[A-Z]\s*/, '').trim();

        // Show rows that partially match the input
        if (nfText.includes(inputNum)) {
            tr.style.display = '';

            // Add matching rows to Batidas dynamically
            if (!addedRows.has(tr)) {
                const clonedRow = tr.cloneNode(true);
                clonedRow.style.opacity = '0';
                clonedRow.style.transition = 'opacity 0.7s';
                batidasTable.appendChild(clonedRow);
                setTimeout(() => {
                    clonedRow.style.opacity = '1';
                }, 50);
                addedRows.add(tr);
            }
        } else {
            tr.style.display = 'none';
        }
    });
}

// Adiciona evento nos inputs para filtrar ao digitar
document.querySelectorAll('.number-box input').forEach(input => {
    input.addEventListener('input', filterPossibilidadesAndMoveToBatidas);
});

// Ao carregar a página, esconde todas as linhas das duas tabelas
window.addEventListener('DOMContentLoaded', () => {
    const possibilidadesTable = document.querySelectorAll('.table-section')[1].querySelector('tbody');
    const batidasTable = document.querySelectorAll('.table-section')[0].querySelector('tbody');
    possibilidadesTable.querySelectorAll('tr').forEach(tr => {
        tr.style.display = 'none';
    });
    batidasTable.innerHTML = '';
});



function updateBackgroundForCentenaEMilhar() {
    const primeiroSorteioImg = document.getElementById('primeiro-sorteio-img');
    const primeiroSorteioImgDois = document.getElementById('primeiro-sorteio-img-dois');

    // Verificar se algum checkbox do tipo "Centena" ou "Milhar" está selecionado
    const checkboxesSelecionados = document.querySelectorAll('#batidasTable tbody input[type="checkbox"]:checked');
    let countCentena = 0;
    let countMilhar = 0;

    checkboxesSelecionados.forEach(checkbox => {
        const linha = checkbox.closest('tr');
        const dadosCliente = linha.querySelectorAll('td');

        // Verificar se o cliente é do tipo "Centena" pelo span com a classe 'nf-centena'
        if (dadosCliente[4].querySelector('.nf-centena')) {
            countCentena++;
        }

        // Verificar se o cliente é do tipo "Milhar" pelo span com a classe 'nf-milhar'
        if (dadosCliente[4].querySelector('.nf-milhar')) {
            countMilhar++;
        }
    });

    // Alterar o background-image da div com base na quantidade de ganhadores do tipo "Centena" ou "Milhar"
    // if (countMilhar == 1) {
    //     primeiroSorteioImg.style.backgroundImage = "url('Ganhador-Milhar.jpg')"; // Imagem para ganhador do milhar
    //     primeiroSorteioImg.style.backgroundSize = 'cover';
    // } else if (countMilhar > 1) {
    //     primeiroSorteioImg.style.backgroundImage = "url('Bola-Maior-Milhar.jpg')"; // Imagem para mais de um ganhador da centena
    //     primeiroSorteioImg.style.backgroundSize = 'cover';
    // }
    //  else if (countCentena > 1) {
    //     primeiroSorteioImgDois.style.backgroundImage = "url('Bola-Maior-Centena.jpg')"; // Imagem para mais de um ganhador da centena
    //     primeiroSorteioImgDois.style.backgroundSize = 'cover';
    // } else if (countCentena === 1) {
    //     primeiroSorteioImgDois.style.backgroundImage = "url('Ganhador-Centena.jpg')"; // Imagem para um único ganhador da centena
    //     primeiroSorteioImgDois.style.backgroundSize = 'cover';
    // } else if(countMilhar === 0){
    //     primeiroSorteioImg.style.backgroundImage = '';
    // }
    // else if(countCentena === 0){
    //     primeiroSorteioImgDois.style.backgroundImage = '';
    // }
    // else if(countMilhar === 0 && countCentena === 0){
    //     primeiroSorteioImg.style.backgroundImage = '';
    //     primeiroSorteioImgDois.style.backgroundImage = '';
    // }
    // console.log('Milhar:', countMilhar, 'Centena:', countCentena);
    if(countMilhar == 0){
        primeiroSorteioImg.style.backgroundImage = '';
    }
    if(countCentena == 0){
        primeiroSorteioImgDois.style.backgroundImage = '';
    }
    if(countMilhar === 0 && countCentena === 0){
        primeiroSorteioImg.style.backgroundImage = '';
        primeiroSorteioImgDois.style.backgroundImage = '';  
    }
    if(countMilhar == 1){
        primeiroSorteioImg.style.backgroundImage = "url('Ganhador-Milhar.jpg')";
        primeiroSorteioImg.style.backgroundSize = 'cover';
    }
    if(countMilhar > 1){
        primeiroSorteioImg.style.backgroundImage = "url('Bola-Maior-Milhar.jpg')";
        primeiroSorteioImg.style.backgroundSize = 'cover';
    }
    if(countMilhar >= 5){
        primeiroSorteioImg.style.backgroundImage = "url('Roleta.png')";
        primeiroSorteioImg.style.backgroundSize = 'cover';
    }
    if(countCentena == 1){
        primeiroSorteioImgDois.style.backgroundImage = "url('Ganhador-Centena.jpg')";
        primeiroSorteioImgDois.style.backgroundSize = 'cover';
    }
    if(countCentena > 1){
        primeiroSorteioImgDois.style.backgroundImage = "url('Bola-Maior-Centena.jpg')";
        primeiroSorteioImgDois.style.backgroundSize = 'cover';
    }
    if(countCentena >= 5){
        primeiroSorteioImgDois.style.backgroundImage = "url('Roleta.png')";
        primeiroSorteioImgDois.style.backgroundSize = 'cover';
        // const a = document.createElement('a');
        // primeiroSorteioImgDois.appendChild(a);
        // a.href = "https://agrossdev.github.io/roleta/";
        // a.target = "_blank";
        // a.style.display = "block";
        // a.style.width = "100%";
        // a.style.height = "100%";
        // a.style.position = "absolute";
        // a.style.top = "0";
        // a.style.left = "0";
        // modal2.style.zIndex = "-10";
        // modal2.style.display = 'none';
        // modalContent2.style.display = 'none';
    }

}

// Add event listener to checkboxes
document.addEventListener('DOMContentLoaded', () => {
    const batidasTable = document.getElementById('batidasTable');

    // Use event delegation to handle dynamically added checkboxes
    batidasTable.addEventListener('change', (event) => {
        if (event.target && event.target.matches('input[type="checkbox"]')) {
            updateBackgroundForCentenaEMilhar();
        }
    });
});

function updateSpanTipoIfNumbersMatch() {
    const inputNum = getInputNumber();

    // Verifica se há pelo menos três números digitados
    if (inputNum.length >= 3) {
        const lastThreeInput = inputNum.slice(-3); // Pega os três últimos números digitados

        // Itera sobre todas as tds com a classe 'nf'
        document.querySelectorAll('td.nf').forEach(td => {
            const nfText = td.textContent.trim();
            // Verifica se os três últimos números da nota fiscal correspondem aos digitados
            if (nfText.slice(-3) === lastThreeInput) {
                const spanTipo = td.closest('tr').querySelector('span.tipo'); // Encontra o span com a classe 'tipo' na mesma linha
                if (spanTipo && !spanTipo.classList.contains('nf-milhar')) { // Não sobrescreve 'M'
                    spanTipo.classList.add('nf-centena'); // Adiciona a classe 'nf-centena'
                    spanTipo.textContent = 'C'; // Atualiza o conteúdo do span para 'C'
                    td.closest('tr').style.display = ''; // Garante que a linha permaneça visível

                    // Adiciona a linha à tabela de batidas se ainda não estiver lá
                    const batidasTable = document.querySelectorAll('.table-section')[0].querySelector('tbody');
                    const nfIdentifier = td.textContent.trim(); // Usa o texto da NF como identificador único
                    const existingRow = Array.from(batidasTable.querySelectorAll('tr')).find(row => row.querySelector('td.nf')?.textContent.trim() === nfIdentifier);
                    if (!existingRow) {
                        const clonedRow = td.closest('tr').cloneNode(true);
                        batidasTable.appendChild(clonedRow);
                    }
                }
            }
        });
    }

    // Verifica se há quatro números digitados
    if (inputNum.length === 4) {
        const lastFourInput = inputNum.slice(-4); // Pega os quatro últimos números digitados

        // Itera sobre todas as tds com a classe 'nf'
        document.querySelectorAll('td.nf').forEach(td => {
            const nfText = td.textContent.trim();
            // Verifica se os quatro últimos números da nota fiscal correspondem aos digitados
            if (nfText.slice(-4) === lastFourInput) {
                const spanTipo = td.closest('tr').querySelector('span.tipo'); // Encontra o span com a classe 'tipo' na mesma linha
                if (spanTipo) {
                    spanTipo.classList.add('nf-milhar'); // Adiciona a classe 'nf-milhar'
                    if (spanTipo instanceof NodeList) {
                        spanTipo.forEach(element => {
                            element.classList.remove('nf-centena');
                        });
                    } else if (spanTipo) {
                        spanTipo.classList.remove('nf-centena');
                    }
                    spanTipo.textContent = 'M'; // Atualiza o conteúdo do span para 'M'
                    td.closest('tr').style.display = ''; // Garante que a linha permaneça visível

                    // Adiciona a linha à tabela de batidas se ainda não estiver lá
                    const batidasTable = document.querySelectorAll('.table-section')[0].querySelector('tbody');
                    const nfIdentifier = td.textContent.trim(); // Usa o texto da NF como identificador único
                    const existingRow = Array.from(batidasTable.querySelectorAll('tr')).find(row => row.querySelector('td.nf')?.textContent.trim() === nfIdentifier);
                    if (!existingRow) {
                        const clonedRow = td.closest('tr').cloneNode(true);
                        batidasTable.appendChild(clonedRow);
                    }
                }
            }
        });
    }
}

// Adiciona evento nos inputs para verificar ao digitar
document.querySelectorAll('.number-box input').forEach(input => {
    input.addEventListener('input', () => {
        filterPossibilidadesAndMoveToBatidas(); // Mantém a funcionalidade existente
        updateSpanTipoIfNumbersMatch(); // Verifica e atualiza o span 'tipo'
    });
});

// Função para limitar a seleção de checkboxes
// function limitarSelecaoCheckboxes(tipo, limite) {
//     const checkboxes = document.querySelectorAll(`#batidasTable tbody input[type="checkbox"]`);

//     let count = 0;
//     checkboxes.forEach(checkbox => {
//         const linha = checkbox.closest('tr');
//         const nfCell = linha.querySelector('td.nf');
//         if (nfCell && nfCell.querySelector(`.nf-${tipo}`)) {
//             if (checkbox.checked) {
//                 count++;
//             }
//         }
//     });

//     if (count > limite) {
//         alert(`Você só pode selecionar até ${limite} checkboxes do tipo ${tipo}.`);
//         return false;
//     }

//     return true;
// }

// Adicionar evento para limitar a seleção
// batidasTable.addEventListener('change', (event) => {
//     if (event.target && event.target.matches('input[type="checkbox"]')) {
//         const linha = event.target.closest('tr');
//         const nfCell = linha.querySelector('td.nf');

//         if (nfCell) {
//             if (nfCell.querySelector('.nf-milhar')) {
//                 if (!limitarSelecaoCheckboxes('milhar', 4)) {
//                     event.target.checked = false;
//                 }
//             } else if (nfCell.querySelector('.nf-centena')) {
//                 if (!limitarSelecaoCheckboxes('centena', 4)) {
//                     event.target.checked = false;
//                 }
//             }
//         }
//     }
// });

// Função para impedir a seleção de checkboxes com a classe cliente-nadimplete
function impedirSelecaoClientesNadimplete(event) {
    if (event.target && event.target.matches('input[type="checkbox"]')) {
        const linha = event.target.closest('tr');
        if (linha && linha.classList.contains('cliente-inadimplente')) {
            alert('Não é permitido selecionar clientes inadimplentes.');
            event.target.checked = false;
        }
    }
}

// Adicionar evento para impedir a seleção
// batidasTable.addEventListener('change', impedirSelecaoClientesNadimplete);