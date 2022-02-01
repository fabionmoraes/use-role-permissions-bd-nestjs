import { PrismaClient } from '@prisma/client';
import { bcryptPassword } from '../src/config/bcrypt';

const prismaClient = new PrismaClient();

async function main() {
  const user = await prismaClient.user.findFirst();

  if (!user) {
    const password = await bcryptPassword('123456');

    await prismaClient.user.create({
      data: {
        name: 'Jhon Will',
        email: 'jhon.will@dev.com',
        password,
      },
    });
  }

  const role = await prismaClient.role.findFirst();

  if (!role) {
    const data = [
      {
        name: 'Admin',
        slug: 'admin',
      },
      {
        name: 'Moderado',
        slug: 'moderado',
        permissions: [
          {
            name: 'roles',
            permissions: {
              GET: true,
              POST: false,
              UPDATE: true,
              DELETE: false,
            },
          },
        ],
      },
    ];

    const dataForm = data.map((item) => ({
      ...item,
      permissions: JSON.stringify(item.permissions),
    }));

    await prismaClient.role.createMany({
      data: dataForm,
    });

    const role = await prismaClient.role.findFirst({
      where: { slug: 'moderado' },
    });

    await prismaClient.userRole.create({
      data: {
        user_id: user.id,
        role_id: role.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
