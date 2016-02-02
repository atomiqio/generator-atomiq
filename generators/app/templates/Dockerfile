FROM atomiq/node:5-onbuild

ENV NPM_CONFIG_LOGLEVEL warn

# For debugging with node-inspector
# ---------------------------------
# Connect to the machine IP on port 8080 for the node-inspector web UI.
# The URL should look something like this:
#
#   http://192.168.99.100:8080/?ws=192.168.99.100:8080&port=5858
#
# Why is node-inspector installed globally in the image?
# It could be installed as a local module, but unfortunately, that
# would preclude taking advantage of volume mapping during development.
# During development, you can avoid constantly rebuilding the image
# and save substantial time by mounting your current directory to /usr/src/app
# in the container so that your revisions hide the contents of the image.
# You only need to rebuild and publish the image when you are satisfied.
# This means you will need to run `npm install` in your directory so
# that you have a valid node_modules directory. But the problem is that
# if node-inspector is installed as a local npm module, it will be compiled
# for your host os platform during installation. If you develop on OS X or
# Windows and then mount your local directory when starting an app container,
# the compiled module under the node_modules directory will be incompatible
# with a container running linux. By not making node-inspector a dependency
# in package.json and installing it as a global tool, we ensure that the
# container uses the correct binary.
#
RUN npm install -g node-inspector
EXPOSE 8080

CMD [ "npm", "start" ]
