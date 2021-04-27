import Enemy from "./Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


@property(cc.Prefab)
enemyPrefab:cc.Prefab;


@property(cc.Node)
public enemies:cc.Node[]=[];
@property(Enemy)
public enemy:Enemy[]=[];

@property
maxX:number=0;
@property
maxY:number=0;
@property
minX:number=0;
@property
minY:number=0;
@property
public numberOfEnemies:number=0;

    start () 
    {
        this.Spawn(this.numberOfEnemies);
   
    }


    Spawn(Amount)
    {
         var emenyNumber=Amount-1;
         for(var i=0;i<=emenyNumber;i++)
          {
            var scene = cc.director.getScene();
            this.enemies[i]=cc.instantiate(this.enemyPrefab);
            this.enemies[i].position=this.RandomPosition(this.maxX,this.maxY,this.minX,this.minY);
            this.enemies[i].parent = scene;

            this.enemy[i]=this.enemies[i].getComponent("Enemy");
          }

    }
    
    RandomPosition(maxX:number,maxY:number,minX:number,minY:number): cc.Vec3
    {
       var position=cc.v3();
       position.x= Math.floor(Math.random() * (maxX - minX + 1) + minX);
       position.y= Math.floor(Math.random() * (maxY - minY + 1) + minY);
       position.z=0;

       return position;
      
    }
}
