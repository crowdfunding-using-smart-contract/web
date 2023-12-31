# FundO

Crowdfunding systems that use blockchain technology typically involve a project creator setting a funding goal and backers contributing to the project using cryptocurrency

## Stack

![My Tech Stack](https://github-readme-tech-stack.vercel.app/api/cards?align=center&titleAlign=center&lineCount=4&theme=github_dark&hideTitle=true&line1=react,react,61DAFB;react-query,react-query,FF4500;&line3=typescript,typescript,3178C6;vite,vite,646CFF;&line2=zustand,zustand,64D5CA;axios,axios,4183C4;&line4=eslint,eslint,4B32C3;prettier,prettier,F7B93E;)

| Tool        | Purpose                                           |
| ----------- | ------------------------------------------------- |
| React       | A JavaScript library for building user interfaces |
| React Query | Data synchronization library for React            |
| Zustand     | Minimalist state management                       |
| TypeScript  | Static typing for JavaScript                      |
| Vite        | Build tool and development server                 |

## Required Versions

| Tool       | Version |
| ---------- | ------- |
| NodeJS     | >=18    |
| TypeScript | >=4.9.4 |
| pnpm       | >=8.9.2 |

## Getting Started

### Clone the repository

```
git clone https://github.com/crowdfunding-using-smart-contract/web.git web
cd web
```

### Installing Dependencies

```
pnpm install
```

### Running Locally

To run the project locally, simply execute:

```
pnpm run dev
```

## Project Structure

Here's a basic overview of the significant folders in the boilerplate:

```
├── public
└── src
  ├── components
  ├── hooks
  ├── lib
  ├── pages
  ├── routes
  ├── services
  ├── store
  └── types
```

| Folder        | Description                                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`src/`**    | Contains the main source code for the application.                                                                                                            |
| `components`  | Reusable React components, each handling a specific piece of the UI.                                                                                          |
| `hooks`       | Custom React hooks that encapsulate logic and behaviors which can be reused across different components.                                                      |
| `lib`         | Miscellaneous utility functions, helpers, and other standalone pieces of logic.                                                                               |
| `pages`       | Components representing full pages in the application, typically corresponding to routes.                                                                     |
| `routes`      | Configuration and components related to routing in the application.                                                                                           |
| `services`    | Functions or classes that handle tasks like API calls, data processing, or other "service"-like tasks.                                                        |
| `store`       | Zustand st ores for state management, holding                                                                                                                 |
| **`public/`** | Contains static assets like images, fonts, and the entry HTML file. Assets in this directory are served directly and are not processed by bundlers like Vite. |

## License

[MIT](https://github.com/crowdfunding-using-smart-contract/web/blob/main/LICENSE)
