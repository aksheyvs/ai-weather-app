import { prisma } from "../src/db/postgresClient.ts"

async function main() {
    await prisma.plan.createMany({
        data: [
            {
                name: "Free",
                price: 0,
                apiLimit: 100,
            },
            {
                name: "Pro",
                price: 1000,
                apiLimit: 10000,
            },
        ],
        skipDuplicates: true,
    });
}

main()
    .then(() => {
        console.log("Plans seeded");
    })
    .catch(console.error)
    .finally(() => prisma.$disconnect());