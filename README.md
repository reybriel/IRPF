# IRPF

Um script que realiza o cálculo do imposto de renda para pessoas físicas.

## Utilização

Para ser capaz que rodar o script, é necessário ter o `node` instalado na máquina. Ou qualquer outra ferramenta que permita executar scripts em javascript.

Utilizando `node`, execute:

```bash
node main.mjs <salário bruto> <quantidade de dependentes> <valor das pensões>
```

### Exemplo

```bash
> node main.mjs 2500 1 0
--- INPUT ----
Salário bruto = R$ 2500
Dependentes = 1
Pensões = 0

--- OUTPUT ---
Base de cálculo = R$ 2093.01
INSS = R$ 217.4
IRPF = R$ 14.18
Saldo = R$ 2268.42
--------------
```