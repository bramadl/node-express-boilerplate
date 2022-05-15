/*
  Warnings:

  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[role_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_roleId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `roleId`,
    ADD COLUMN `role_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_role_id_key` ON `users`(`role_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
