-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_diretoria" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "usuario_responsavelId" INTEGER NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "dt_ocorrencia" TIMESTAMP(3) NOT NULL,
    "hr_ocorrencia" TEXT NOT NULL,
    "nomePaciente" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "raca_cor" TEXT,
    "idade" INTEGER,
    "dt_internacao" TIMESTAMP(3),
    "status" INTEGER NOT NULL,
    "id_tarefa" INTEGER NOT NULL,
    "id_setor_notificante" INTEGER NOT NULL,
    "id_setor_notificado" INTEGER NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "registro" INTEGER NOT NULL,
    "grau_dano" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "envolvimento" BOOLEAN NOT NULL,
    "anonimato" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setores" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "id_usuario_resp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diretoria" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "id_usuario_resp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diretoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL,
    "dt_venc" TIMESTAMP(3) NOT NULL,
    "id_notificacao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnaliseCausaRaiz" (
    "id" SERIAL NOT NULL,
    "id_notificacao" INTEGER NOT NULL,
    "discussaoMultiprofissional" TEXT NOT NULL,
    "investigacaoRealizada" TEXT NOT NULL,
    "maoObra" TEXT NOT NULL,
    "maquina" TEXT NOT NULL,
    "meioAmbiente" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "metodo" TEXT NOT NULL,
    "id_planoAcao" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnaliseCausaRaiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoAcao" (
    "id" SERIAL NOT NULL,
    "oQue" TEXT NOT NULL,
    "porQue" TEXT NOT NULL,
    "onde" TEXT NOT NULL,
    "quem" TEXT NOT NULL,
    "quando" TEXT NOT NULL,
    "como" TEXT NOT NULL,
    "quanto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanoAcao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_user_key" ON "Usuario"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_diretoria_key" ON "Usuario"("id_diretoria");

-- CreateIndex
CREATE UNIQUE INDEX "Diretoria_id_usuario_resp_key" ON "Diretoria"("id_usuario_resp");

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_id_notificacao_key" ON "Tarefa"("id_notificacao");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_diretoria_fkey" FOREIGN KEY ("id_diretoria") REFERENCES "Diretoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_usuario_responsavelId_fkey" FOREIGN KEY ("usuario_responsavelId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_id_setor_notificante_fkey" FOREIGN KEY ("id_setor_notificante") REFERENCES "Setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_id_setor_notificado_fkey" FOREIGN KEY ("id_setor_notificado") REFERENCES "Setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setores" ADD CONSTRAINT "Setores_id_usuario_resp_fkey" FOREIGN KEY ("id_usuario_resp") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_id_notificacao_fkey" FOREIGN KEY ("id_notificacao") REFERENCES "Notificacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnaliseCausaRaiz" ADD CONSTRAINT "fk_analise_notificacao" FOREIGN KEY ("id_notificacao") REFERENCES "Notificacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnaliseCausaRaiz" ADD CONSTRAINT "fk_analise_planoAcao" FOREIGN KEY ("id_planoAcao") REFERENCES "PlanoAcao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
