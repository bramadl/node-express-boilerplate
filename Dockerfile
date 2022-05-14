# Run-time stage
FROM node:16.13.1-alpine

# Set non-root user
USER node
WORKDIR /home/node/app

# Copy dependency information and install production-only depencencies
COPY --chown=node:node . .
RUN yarn install --frozen-lockfile --production

# Expose port 3000
EXPOSE 3000

CMD [ "yarn", "start" ]
