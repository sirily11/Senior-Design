FROM codercom/code-server
USER root
RUN apt-get update && apt-get install -y gnupg2
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt -y update && sudo apt -y install yarn
RUN yarn global add n
RUN n stable
USER root