### before deployment : npx next build
### clean up docker: docker system prune -a --volumes
### start docker and pull images : docker compose up -d

### 37 prisma setup
npx prisma init
npx prisma generate
npx prisma db push

# 8. Create a new Next.js app
npx create-next-app@latest
Need to install the following packages:
create-next-app@14.2.15
Ok to proceed? (y) y

√ What is your project named? ... next-match
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias (@/*)? ... No / Yes
Creating a new Next.js app in C:\Andrey\LabWeb\nextjs\next-match.

# 9
npm install @nextui-org/react framer-motion
npm i react-icons

# 13 making NavLink marked as yellow upon click by using custom NavLink component
in TopNav.tsx ==> 'data-[active=true]:text-yellow-200'

# 17 install react-hook-form to hook input into react app
npm install react-hook-form zod @hookform/resolvers

# 19 addin lib/schemasloginSchema.ts
# 20 registerSchema.ts
npm i react-toastify


# 23 setting up NextAuth and Prisma
# https://authjs.dev/getting-started/installation
npm install next-auth@beta
npx auth secret
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev

# 23 initializing Prisma
npx prisma init

# 25 prisma setup
npx prisma generate
npx prisma db push

# 26 @lib/authActions.ts 
npm i bcryptjs
npm install -D @types/bcryptjs

# 31 react-toastify
npm i react-toastify

# 40 adding tables Member and MemberPhoto
npx prisma generate
npx prisma db push

# 41 seed dummy data all in prisma folder 
# add this line to package.json
"prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
# to run the seed need to install ts-node 
npm i -D ts-node
npx prisma db seed

# 53 adding Like feature to the project 
npx prisma db push

# 69 Setting up Cloudinary : https://console.cloudinary.com/settings
npm i cloudinary next-cloudinary

# 75 challenge : update nav menu image updates and session cookies updates for avatar

# 80 setting prisma model MemberMessage
npx prisma generate
npx prisma db push

# 85 install clsx
npm i clsx

# 91 check for read messages and bold messages that were not read yet
