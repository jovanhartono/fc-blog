import { defineConfig, LocalAuthProvider } from "tinacms";
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from "tinacms-authjs/dist/tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  contentApiUrlOverride: "/api/tina/gql",
  branch,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      TinaUserCollection,
      {
        name: "article",
        label: "Articles",
        path: "content",
        format: "mdx",
        fields: [
          {
            name: "tags",
            label: "Tags",
            list: true,
            type: "string",
            options: ["Productivity", "Education", "Services"],
          },
          {
            type: "datetime",
            label: "Published At",
            name: "published",
            ui: {
              dateFormat: "MMM DD, YYYY",
            },
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail",
            required: true,
            ui: {
              parse: (value) => `../public${value}`,
              format: (value) => value.replace("../public", ""),
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
