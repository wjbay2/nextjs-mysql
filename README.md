# NextJS MYSQL Sequalize - Assurity Technical Test
Hi, first of all thanks for giving this chance.
Please find below for the details of the project.


## Before Setup
I can't make the app (nextJS) part to running on container due to having difficult to resolve the connection to the MYSQL container `Error: connect ECONNREFUSED 127.0.0.1:3306`.
Applied many solutions but it still didn't work. I guess is some host name resolution issue. So now only can spin up MYSQL container with NextJS running via `pnpm dev`.
If given more time to me I should able to resolve it, due to I'm traveling back on Malaysia on past weekend so maybe 3 day is a little tight for me.
![image](https://github.com/wjbay2/nextjs-mysql/assets/14900950/65d0b3a8-0ad6-498b-bc8e-a7a3f965427e)

For the file upload I am using FileStack which is pretty simple and straight forward.
I also did a pagination to the product page current is 10 items per page.

Frontend/Backend : NextJS + Bootstrap 5 + Sequalize
DB: MYSQL
File Storage: FileStack

## Setup
- Go to project root directory
- Install all necessary dependency using `npm i` or `pnpm i` (need install pnpm if needed)
- Build the container using `sudo docker-compose build`
- Start the container using `sudo docker-compose up`
- Start the app using `pnpm dev`
- Go to `localhost:3000` you should see the project is running.

Refer to this [link](https://watch.screencastify.com/v/5RMHpSJSqeAVouXibx2R) for setup the project.

Refer to this [link](https://watch.screencastify.com/v/tzzBEXzFLz9EjrUpcIAq) for my recording of adding and updating product.

If you had a difficulty run the project let me know via the email.
