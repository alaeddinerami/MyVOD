FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    watchman \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g expo-cli

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

CMD ["npm", "start"]
