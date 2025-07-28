-- CreateTable
CREATE TABLE "device" (
    "projectId" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor" (
    "parentDeviceId" TEXT NOT NULL,
    "readingSchemaUrl" TEXT NOT NULL,
    "id" UUID NOT NULL,
    "info" JSONB NOT NULL,
    "infoSchemaUrl" TEXT NOT NULL,

    CONSTRAINT "sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading" (
    "id" UUID NOT NULL,
    "sensorId" UUID NOT NULL,
    "data" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "device_id_key" ON "device"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sensor_id_key" ON "sensor"("id");

-- CreateIndex
CREATE INDEX "sensor_parentDeviceId_idx" ON "sensor"("parentDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "reading_id_key" ON "reading"("id");

-- CreateIndex
CREATE INDEX "reading_sensorId_idx" ON "reading"("sensorId");

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_parentDeviceId_fkey" FOREIGN KEY ("parentDeviceId") REFERENCES "device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
