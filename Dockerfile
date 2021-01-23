FROM node:14-buster-slim

## PART 1: System components
## =======================
# Install utilities
RUN apt-get clean &&\
    apt-get update &&\
    apt-get update --fix-missing &&\
    apt-get -y upgrade &&\
    apt-get install -y nano \
  sudo \
  curl \
  wget \
  unzip \
  git \
  git-flow \
  make \
  python3 \
  python3-pip \
  software-properties-common

# Update Git to 2.20 (Husky requires 2.13)
# add-apt-repository ppa:git/ppa && apt-get update && apt-get install -y git=2.13.0
# https://devconnected.com/how-to-install-git-on-debian-10-buster/
RUN apt-get -y install dh-autoreconf \
    libcurl4-gnutls-dev \
    libexpat1-dev \
    gettext \
    libz-dev \
    libssl-dev \
    asciidoc \
    xmlto \
    docbook2x \
    install-info \
    && \
mkdir -p /usr/local/src &&\
  cd /usr/local/src &&\
  wget https://github.com/git/git/archive/v2.20.0.tar.gz &&\
  mv v2.20.0.tar.gz ./git-2.20.0.tar.gz &&\
  tar -xzvf git-2.20.0.tar.gz &&\
  cd git-2.20.0/ &&\
  make configure &&\
  ./configure --prefix=/usr &&\
  make all doc info &&\
  sudo make install \
    install-doc \
    install-html \
    install-info

# https://github.com/microsoft/playwright/issues/3167 --> No headless webkit
# https://github.com/microsoft/playwright/issues/2748
# 2. Install WebKit dependencies
RUN apt-get install -y libwoff1 \
  libopus0 \
  libwebp6 \
  libwebpdemux2 \
  libenchant1c2a \
  libgudev-1.0-0 \
  libsecret-1-0 \
  libhyphen0 \
  libgdk-pixbuf2.0-0 \
  libegl1 \
  libnotify4 \
  libxslt1.1 \
  libevent-2.1-6 \
  libgles2 \
  libvpx5 \
  libicu-dev

# 3. Install gstreamer and plugins to support video playback in WebKit.
# RUN apt-get install -y gstreamer1.0-gl \
#   gstreamer1.0-plugins-base \
#   gstreamer1.0-plugins-good \
#   gstreamer1.0-plugins-bad


# 4. Install Chromium dependencies
RUN apt-get install -y libnss3 \
  libnss3-dev \
  libxss1 \
  libasound2 \
  fonts-noto-color-emoji

# 5. Install Firefox dependencies
RUN apt-get install -y libdbus-glib-1-2 \
  libxt6 \
  libgtk-3-common

  # libgbm.so.1 solved by one of the webkit dependencies
  # libgtk-3-common:
  #       libgtk-3.so.0
  #       libgdk-3.so.0
  #       libpangocairo-1.0.so.0
  #       libpango-1.0.so.0
  #       libatk-1.0.so.0
  #       libcairo-gobject.so.2
  #       libgdk_pixbuf-2.0.so.0
  #       libpangoft2-1.0.so.0


# Failed to launch the browser process!
# /repo/node_modules/puppeteer/.local-chromium/linux-756035/chrome-linux/chrome: error while loading shared libraries: libgbm.so.1: cannot open shared object file: No such file or directory
# no? - sudo apt-get update
# sudo apt-get install libgbm-dev

# Install yarn
# RUN npm --global install yarn

# Install python markdown utility library
RUN pip3 install mdutils

## PART 3: Environment
ENV PYTHONPATH "${PYTHONPATH}:/usr/local/lib/python3.8/dist-packages"
RUN mkdir /repo
RUN mkdir /repo/client
RUN mkdir /repo/server

### PART 3b: Dev Environment
RUN npm install -g nodemon
