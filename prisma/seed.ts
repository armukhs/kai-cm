import { PrismaClient } from '@prisma/client';
import units from './units-slug.json';
import jabatans from './jabatans-slug.json';
import cuid from 'cuid';

const prisma = new PrismaClient();

async function main() {
  try {
    // Unit
    await prisma.unit.createMany({ data: units });

    // Jabatan
    await prisma.jabatan.createMany({ data: jabatans });

    // Admin
    await prisma.user.create({
      data: {
        id: cuid.slug(),
        nama: 'Administrator',
        nipp: 'upp01',
        email: 'upp01cm@kai.id',
        roles: 'admin',
        unitId: 'ou19k3jzq', // Departemen Project Management
        jabatanId: '7a7ho3jc8', // Vice President Project Management
        Hash: {
          create: {
            hash: process.env.DEFAULT_HASH as string,
          },
        },
      },
    });

    await prisma.user.create({
      data: {
        id: cuid.slug(),
        nama: 'User Mentor',
        nipp: 'upp02',
        email: 'upp02@kai.id',
        unitId: 'ou19k3jzq', // Departemen Project Management
        jabatanId: '7a7hp3jqk', // Project Delivery Leader 1
        roles: 'mentor',
        Hash: {
          create: {
            hash: process.env.DEFAULT_HASH as string,
          },
        },
      },
    });
    await prisma.user.create({
      data: {
        id: cuid.slug(),
        nama: 'User Project',
        nipp: 'upp03',
        email: 'upp03@kai.id',
        unitId: 'ou19k3jzq', // Departemen Project Management
        jabatanId: '7a7hq3jud', // Project Delivery Leader 2
        roles: 'project',
        Hash: {
          create: {
            hash: process.env.DEFAULT_HASH as string,
          },
        },
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}

main();

// UPP ou19k3jzq Departemen Project Management
/*
{
    "id": "7a7ho3jc8",
    "unitId": "ou19k3jzq",
    "kode": "UPP01",
    "nama": "Vice President Project Management"
  },
  {
    "id": "7a7hp3jqk",
    "unitId": "ou19k3jzq",
    "kode": "UPP02",
    "nama": "Project Delivery Leader 1"
  },
  {
    "id": "7a7hq3jud",
    "unitId": "ou19k3jzq",
    "kode": "UPP03",
    "nama": "Project Delivery Leader 2"
  },
  {
    "id": "7a7hr3j8p",
    "unitId": "ou19k3jzq",
    "kode": "UPP04",
    "nama": "Project Delivery Leader 3"
  }
*/
