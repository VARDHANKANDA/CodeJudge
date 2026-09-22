import { PrismaClient, Difficulty, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create default roles & users
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const setterPasswordHash = await bcrypt.hash('setter123', 10);
  const userPasswordHash = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@codejudge.com' },
    update: {},
    create: {
      email: 'admin@codejudge.com',
      username: 'admin',
      name: 'System Admin',
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      isEmailVerified: true,
    },
  });

  const setter = await prisma.user.upsert({
    where: { email: 'setter@codejudge.com' },
    update: {},
    create: {
      email: 'setter@codejudge.com',
      username: 'setter',
      name: 'Problem Setter',
      passwordHash: setterPasswordHash,
      role: Role.PROBLEM_SETTER,
      isEmailVerified: true,
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: 'user@codejudge.com' },
    update: {},
    create: {
      email: 'user@codejudge.com',
      username: 'coder_ram',
      name: 'Ram Kumar',
      passwordHash: userPasswordHash,
      role: Role.USER,
      isEmailVerified: true,
    },
  });

  // 2. Create problems
  const twoSumCodeTemplates = {
    python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your code here\n        pass\n`,
    javascript: `function twoSum(nums, target) {\n    // Write your code here\n}\nmodule.exports = { twoSum };\n`,
    cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        return {};\n    }\n};\n`,
    java: `import java.util.*;\n\npublic class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[0];\n    }\n}\n`,
  };

  const twoSum = await prisma.problem.upsert({
    where: { slug: 'two-sum' },
    update: {},
    create: {
      title: 'Two Sum',
      slug: 'two-sum',
      description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
      difficulty: Difficulty.EASY,
      timeLimit: 2000,
      memoryLimit: 256,
      constraints: '- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9\n- Only one valid answer exists.',
      codeTemplates: twoSumCodeTemplates,
      sampleInput: '[2,7,11,15]\n9',
      sampleOutput: '[0,1]',
      points: 100,
      isPublished: true,
      authorId: setter.id,
    },
  });

  // Test Cases for Two Sum (idempotent delete then recreate)
  await prisma.testCase.deleteMany({
    where: { problemId: twoSum.id },
  });
  await prisma.testCase.createMany({
    data: [
      {
        problemId: twoSum.id,
        input: '2,7,11,15\n9',
        expectedOutput: '0,1',
        isHidden: false,
        order: 0,
      },
      {
        problemId: twoSum.id,
        input: '3,2,4\n6',
        expectedOutput: '1,2',
        isHidden: false,
        order: 1,
      },
      {
        problemId: twoSum.id,
        input: '3,3\n6',
        expectedOutput: '0,1',
        isHidden: true,
        order: 2,
      },
    ],
  });

  // 3. Create Achievements & Badges
  await prisma.achievement.upsert({
    where: { name: 'First Accepted Solution' },
    update: {},
    create: {
      name: 'First Accepted Solution',
      description: 'Awarded when you solve your very first coding challenge.',
      badgeUrl: '/badges/first-ac.png',
      pointsRequired: 100,
    },
  });

  await prisma.achievement.upsert({
    where: { name: 'Algorithm Master' },
    update: {},
    create: {
      name: 'Algorithm Master',
      description: 'Awarded when you earn more than 1000 submission points.',
      badgeUrl: '/badges/algo-master.png',
      pointsRequired: 1000,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
