/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EDepartment" AS ENUM ('ACCIDENT_AND_EMERGENCY', 'ANAESTHESIA', 'CANCER_CARE', 'CARDIOLOGY_CARE', 'CARDIOTHORACIC_AND_VASCULAR_SURGERY', 'CARDIOTHORACIC_ANAESTHESIA', 'CHILD_DEVELOPMENT', 'COUNSELLING', 'CRITICAL_CARE', 'DENTAL_AND_MAXILLOFACIAL_SURGERY', 'DERMATOLOGY_AND_VENEREOLOGY', 'DIAGONSTIC_AND_INTERVENTIONAL_RADIOLOGY', 'DIETETICS_AND_NUTRITION', 'ENDOCRINOLOGY_AND_DIABETOLOGY', 'ENT', 'FERTILITY', 'GASTROENTEROLOGY_AND_HEPATOLOGY', 'GENERAL_AND_LAPAROSCOPIC_SURGERY', 'HAEMATOLOGY_AND_STEM_CELL_TRANSPLANT', 'INTERNAL_MEDICINE', 'JOINT_CARE_AND_WELLNESS', 'KINNEY_TRANSPLANT_PROGRAM', 'LAB_MEDICINE', 'LITHOTRIPSY', 'NEONATOLOGY', 'NEPHROLORY', 'NEUROLOGY', 'NEUROSURGERY', 'NUCLEAR_MEDICINA', 'OBSTETRICS_AND_GYNAECOLOGY', 'OPTHALMOLOGY', 'ORTHOPAEDICS', 'PAEDIATRIC_CARDIOLOGY', 'PAEDIATRIC_SURGERY_AND_PAEDICATRIC_UROLOGY', 'PAEDIATRICS', 'PHYSICAL_MEDICINE_AND_REHABILITATION', 'PLASTIC_COMMMA_RECONSTRUCTIVE_AND_COSMETIC_SURGERY', 'PSYCHIATRY', 'RESPIRATORY_MEDICINE', 'RHEUMATOLOGY', 'TRANSFUSION_MEDICINE', 'UROLOGY');

-- CreateEnum
CREATE TYPE "EGender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateEnum
CREATE TYPE "ERank" AS ENUM ('MEDICAL_STUDENT', 'INTERN', 'RESIDENT', 'SENIOR_RESIDENT', 'CHIEF_RESIDENT', 'FELLOW', 'ATTENDING_PHYSICIAN', 'CONSULTANT', 'SPECIALIST', 'REGISTRAR', 'SENIOR_REGISTRAR', 'CONSULTANT_SURGEON', 'CONSULTANT_PHYSICIAN', 'JUNIOR_CONSULTANT', 'SENIOR_CONSULTANT', 'MEDICAL_DIRECTOR', 'CHIEF_OF_MEDICINE', 'PROFESSOR', 'CLINICAL_PROFESSOR', 'ASSISTANT_PROFESSOR', 'ASSOCIATE_PROFESSOR', 'CHAIRMAN');

-- CreateEnum
CREATE TYPE "EAppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'CANCELLED', 'RESCHEDULED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'NO_SHOW', 'PENDING');

-- CreateEnum
CREATE TYPE "EPaymentStatus" AS ENUM ('NOT_PAID', 'PENDING', 'PAID', 'PARTIALLY_PAID', 'FAILED', 'REFUNDED', 'CANCELLED', 'UNDER_REVIEW');

-- CreateEnum
CREATE TYPE "ERole" AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN', 'SUPER_ADMIN');

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "gender" "EGender" NOT NULL,
    "image" TEXT,
    "role" "ERole" NOT NULL DEFAULT 'PATIENT',
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "address" TEXT,
    "emergencyContactNumber" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "doctors" (
    "department" "EDepartment" NOT NULL,
    "rank" "ERank" NOT NULL,
    "qualifications" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "admins" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "super_admins" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "department" "EDepartment" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "status" "EAppointmentStatus" NOT NULL,
    "paymentStatus" "EPaymentStatus" NOT NULL DEFAULT 'NOT_PAID',
    "prescription" TEXT,
    "followUpDate" TIMESTAMP(3),
    "doctorId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER,
    "doctorId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patients_userId_key" ON "patients"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_userId_key" ON "doctors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "super_admins_userId_key" ON "super_admins"("userId");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "super_admins" ADD CONSTRAINT "super_admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
