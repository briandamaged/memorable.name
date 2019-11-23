
import Koa from 'koa';

const app = new Koa();

app.use(function(ctx) {
  ctx.body = "Howdy!";
});

app.listen(3000, function() {
  console.log("Listening...");
});
