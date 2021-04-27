import GameController from "./GameController";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   @property
   public distanceFromPlayer: Number = 0;
 

   @property(cc.Node)
   player:cc.Node;
   
   @property(cc.Node)
   bullet:cc.Node;

   @property(cc.Node)
   gameController:cc.Node;
   @property
   flag:boolean=false;
  
  
 
 
    onLoad ()
    {
      this.gameController=cc.find("GameController");

      this.player=cc.find("Player");
     
      var X1=this.player.x;
      var Y1=this.player.y;

      var X2=this.node.x;
      var Y2=this.node.y;

      this.distanceFromPlayer=Math.sqrt((X2-X1)*(X2-X1)+(Y2-Y1)*(Y2-Y1));
     // console.debug(this.distanceFromPlayer);
      //console.debug("assd");
      cc.director.getCollisionManager().enabled=true;
      

    }

    onCollisionEnter(other:cc.Collider,self)
    {
         this.bullet=cc.find("Bullet");         
         this.bullet.destroy();
         this.destroyEnemy();
         var gameControllervar=this.gameController.getComponent("GameController");  
         if(this.flag==false)
         {
            gameControllervar. checkIfGameOver();
            this.flag=true;
         }      
        
       
         
        
    }

    destroyEnemy()
    {
        var shrink=cc.scaleTo(2,0);

         this.node.runAction(shrink);
         
         this.scheduleOnce(function () {
         this.node.destroy();
           
        }, 2);
        this.distanceFromPlayer=1000;

    }

   gameOver()
   {
      console.log("game over");
   }
}
