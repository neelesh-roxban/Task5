import EnemySpawner from "./EnemySpawner";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    gameOverUI:cc.Node;

    @property(EnemySpawner)
    enemySpawner:EnemySpawner;

    @property(cc.Node)
    player:cc.Node;

    @property(cc.Prefab)
    bullet:cc.Prefab;

    onLoad()
    {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled=true;
    }
    start ()
    {
       

    }
    
    findTheNearestEnemyIndex():cc.Node
    {
        var distances=[];
        
       // console.log(this.enemySpawner.enemies.length);
        for(var i=0;i<this.enemySpawner.enemies.length;i++)
           
          {
            distances[i] =this.enemySpawner.enemy[i].distanceFromPlayer;
               
           }
        //  console.log(distances.length);
        
          return this.enemySpawner.enemies[distances.indexOf( Math.min(...distances))]
    
    
    }

    fire()
    {
      console.log("fire");    
      this.spawnBullet();   
      
     
    }

 

    spawnBullet()
    {   var enemy=this. findTheNearestEnemyIndex();
        this.player.angle= -90+Math.atan2(enemy.position.y - this.player.position.y, enemy.position.x - this.player.position.x) * 180 / Math.PI;
        var scene = cc.director.getScene();
        var bulletNode=cc.instantiate(this.bullet);
        bulletNode.parent=scene;
        bulletNode.position=this.player.position;

        var rigidbody=bulletNode.getComponent(cc.RigidBody);
        var a=cc.v2((enemy.position.x-this.player.position.x),(enemy.position.y-this.player.position.y));
        a.normalizeSelf();

        rigidbody.linearVelocity=a.multiplyScalar(1000);        
       
    }

    checkIfGameOver()
    
    {              
        this.enemySpawner.numberOfEnemies--;
        if(this.enemySpawner.numberOfEnemies==0)
        {
            console.log("gameOver");
            this.scheduleOnce(function () {
                this.gameOverUI.active=true;
                  
               }, 2);
           
        }
       
    }



   
}
