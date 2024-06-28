/*
  Warnings:

  - Added the required column `cnpj` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `cnpj` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `company_cnpj_index` ON `Company`(`cnpj`);
