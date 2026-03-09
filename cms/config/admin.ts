import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('PREVIEW_ALLOWED_ORIGIN', 'http://localhost:3000')],
      async handler(uid, { documentId, locale, status }) {
        const frontendBaseUrl = env('PREVIEW_BASE_URL', 'http://localhost:3000');
        const previewSecret = env('PREVIEW_SECRET', env('STRAPI_PREVIEW_SECRET', 'change-me'));

        const getUrl = (params: Record<string, string>) => {
          const search = new URLSearchParams({
            secret: previewSecret,
            ...params,
          });
          return `${frontendBaseUrl}/api/preview?${search.toString()}`;
        };

        if (uid === 'api::article.article') {
          const articleStatus = status === 'published' ? 'published' : 'draft';
          const article = await strapi
            .documents(uid)
            .findOne({
              documentId,
              locale,
              status: articleStatus,
              fields: ['slug'],
            });

          if (article?.slug) {
            return getUrl({ slug: article.slug });
          }
        }

        return getUrl({ path: '/' });
      },
    },
  },
});

export default config;
