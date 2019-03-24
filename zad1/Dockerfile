FROM ubuntu:18.04

MAINTAINER Adrian Belciak <adrian.belciak@student.uj.edu.pl>

RUN useradd ujot --create-home

RUN apt-get update
RUN apt-get install -y vim unzip curl git

# dodaj konfigurację tutaj

#JAVA8
RUN cd /tmp

RUN \
apt-get install -y software-properties-common && \
add-apt-repository ppa:webupd8team/java && \
apt update && \
echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections && \
apt install -y oracle-java8-installer && \
apt install -y oracle-java8-set-default && \
rm -rf /var/cache/oracle-jdk8-installer/jdk-8u201-linux-x64.tar.gz

#SCALA
RUN \
apt-get remove scala-library scala  && \
wget www.scala-lang.org/files/archive/scala-2.12.7.deb  && \
dpkg -i scala-2.12.7.deb  && \
rm -rf /scala-2.12.7.deb

#SBT
RUN \
curl -L -o sbt-1.2.7.deb https://dl.bintray.com/sbt/debian/sbt-1.2.7.deb && \
dpkg -i sbt-1.2.7.deb && \
rm sbt-1.2.7.deb && \
apt-get update && \
apt-get install sbt && \
sbt sbtVersion

RUN apt-get clean

#

USER ujot

CMD echo "Hello World"
