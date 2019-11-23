
import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const rtr = new Router();

rtr.get('/', function(ctx) {
  ctx.body = "Navigate to /api/names for 'Memorable' names!";
});

rtr.get('/api/names', function(ctx) {
  ctx.body = {
    content: [
      {
        first: "Warren",
        last: "Peace",
      },
      {
        first: "Helen",
        last: "Wheels",
      },
    ]
  };

});

app.use(rtr.routes());

app.listen(3000, function() {
  console.log("Listening...");
});
