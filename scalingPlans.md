Clearly, nodeJS was not designed for the kind of work that I am doing here with it.
So, here is the file in which I will brainstorm some options for how I can optimize the rendering process.

Assuming final input to the program comes in the form of some text document that can be fed to a CLI by stdin:

- Idea One: Divide and Conquer
  - Build out the scene, and produce some artifact of its representation
  - Feeding sections of that to new processes out a bash script, process subsections of all of the rays necessary to render the scene in such a way that the results can be integrated again to finalize colors
  - Break the Canvas up into sections (as many sections as cpu threads are available), and print that into stdout somehow so that we don't have to eat up disk by storing it
  - use 'cat' to concatenate the results above (the printed rows of pixels) to build the final ppm
  - convert that ppm into whatever file type I want (hopefully without storing it to disk in the interum)
