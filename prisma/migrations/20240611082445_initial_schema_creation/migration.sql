-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `owner_name` VARCHAR(191) NOT NULL,
    `owner_email` VARCHAR(191) NOT NULL,
    `product_key` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `company_name_index`(`company_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `user_cpf` VARCHAR(191) NOT NULL,
    `user_level` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `company_id_index`(`company_id`),
    INDEX `user_email_index`(`company_id`, `user_email`),
    INDEX `user_cpf_index`(`company_id`, `user_cpf`),
    UNIQUE INDEX `User_company_id_user_email_key`(`company_id`, `user_email`),
    UNIQUE INDEX `User_company_id_user_cpf_key`(`company_id`, `user_cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `browser` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `user_id_index`(`user_id`),
    INDEX `company_id_index`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
