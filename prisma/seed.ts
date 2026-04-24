import prisma from '../src/lib/prisma';

async function main() {
  const tagNames = [
    'Push',
    'Pull',
    'Legs',
    'Chest',
    'Back',
    'Shoulder',
    'Tricep',
    'Bicep',
  ];

  for (const name of tagNames) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const exercises: { name: string; tags: string[] }[] = [
    { name: 'Lat Pulldown', tags: ['Pull', 'Back'] },
    { name: 'Seated Cable Row', tags: ['Pull', 'Back'] },
    { name: 'Rows', tags: ['Pull', 'Back'] },
    { name: 'Bar Bicep Curl', tags: ['Pull', 'Bicep'] },
    { name: 'Unilateral Cable Pulldown', tags: ['Pull', 'Back'] },
    { name: 'Unilateral Lat Pulldown', tags: ['Pull', 'Back'] },
    { name: 'Rope Lat Pulldown', tags: ['Pull', 'Back'] },
    { name: 'Unilateral Preacher Hammer Curls', tags: ['Pull', 'Bicep'] },
    { name: 'Dumbbell Press', tags: ['Push', 'Chest'] },
    { name: 'Machine Fly', tags: ['Push', 'Chest'] },
    { name: 'Incline Dumbbell Press', tags: ['Push', 'Chest'] },
    { name: 'Cable Fly', tags: ['Push', 'Chest'] },
    { name: 'Tricep Pushdown Bar', tags: ['Push', 'Tricep'] },
    { name: 'Unilateral Tricep Cable', tags: ['Push', 'Tricep'] },
    { name: 'Hacksquat', tags: ['Legs'] },
    { name: 'Squat', tags: ['Legs'] },
    { name: 'Unilateral Leg Curl', tags: ['Legs'] },
    { name: 'Unilateral Leg Press', tags: ['Legs'] },
    { name: 'Leg Extension', tags: ['Legs'] },
    { name: 'Seated Leg Curl', tags: ['Legs'] },
    { name: 'Seated Calf Raise', tags: ['Legs'] },
    { name: 'Shoulder Press', tags: ['Push', 'Shoulder'] },
    { name: 'Seated Incline Curl', tags: ['Pull', 'Bicep'] },
    { name: 'Lateral Raise', tags: ['Push', 'Shoulder'] },
    { name: 'Tricep VBar', tags: ['Push', 'Tricep'] },
    { name: 'Cable Lateral Raise', tags: ['Push', 'Shoulder'] },
    { name: 'Cable Unilateral Curl', tags: ['Pull', 'Bicep'] },
    { name: 'Tricep Rope Pushdown', tags: ['Push', 'Tricep'] },
    { name: 'Reverse Fly', tags: ['Pull', 'Shoulder'] },
  ];

  for (const exercise of exercises) {
    const tags = await prisma.tag.findMany({
      where: { name: { in: exercise.tags } },
    });

    const ex = await prisma.exerciseBank.upsert({
      where: { name: exercise.name },
      update: {},
      create: { name: exercise.name },
    });

    for (const tag of tags) {
      await prisma.exerciseBank_Tag.upsert({
        where: {
          exerciseBankId_tagId: { exerciseBankId: ex.id, tagId: tag.id },
        },
        update: {},
        create: { exerciseBankId: ex.id, tagId: tag.id },
      });
    }
  }

  console.log('Seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
