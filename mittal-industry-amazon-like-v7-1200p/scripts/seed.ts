import mongoose from "mongoose";
import Product from "@/models/Product";
import dbConnect from "@/lib/dbConnect";

const CATS = [
  { key: "inverters", min: 3000, max: 15000, brands: ["Luminous","Microtek","Exide","Amaron"] },
  { key: "batteries", min: 2500, max: 14000, brands: ["Exide","Amaron","Livguard","SF Sonic"] },
  { key: "led", min: 99, max: 1299, brands: ["Philips","Havells","Syska","Wipro"] },
  { key: "fans", min: 999, max: 6999, brands: ["Usha","Crompton","Orient","Havells"] },
  { key: "stabilizers", min: 1200, max: 7999, brands: ["V-Guard","Microtek","Everest","Luminous"] },
  { key: "wires", min: 299, max: 4999, brands: ["Polycab","Finolex","Havells","RR Kabel"] },
  { key: "sockets", min: 59, max: 1299, brands: ["Anchor","Havells","GM","Legrand"] },
  { key: "electronics", min: 499, max: 49999, brands: ["Sony","Samsung","LG","Boat"] }
];

function imgFor(cat:string){
  const map:any = {
    inverters:"inverter",
    batteries:"battery",
    led:"led bulb",
    fans:"ceiling fan",
    stabilizers:"voltage stabilizer",
    wires:"copper wire",
    sockets:"power socket",
    electronics:"electronics gadget"
  };
  const q = encodeURIComponent(map[cat] || cat);
  const sig = Math.floor(Math.random()*1000000);
  // Unsplash CDN (randomized with sig) - real photos
  return `https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80&sig=${sig}`;
}

function randomBetween(min:number,max:number){ return Math.round((Math.random()*(max-min)+min)/10)*10; }

(async()=>{
  await dbConnect();
  const perCat = 160; // 160 x 8 = 1280
  const docs:any[] = [];
  for(const c of CATS){
    for(let i=1;i<=perCat;i++){
      const brand = c.brands[Math.floor(Math.random()*c.brands.length)];
      const series = ["Pro","Max","Plus","Eco","Smart","Ultra","Prime"][Math.floor(Math.random()*7)];
      const name = `${brand} ${c.key.slice(0,-1).toUpperCase()} ${series} ${100+i}`;
      docs.push({
        name,
        brand,
        description: `Quality ${c.key.slice(0,-1)} for home/office. Warranty included.`,
        image: imgFor(c.key),
        price: randomBetween(c.min, c.max),
        stock: Math.floor(Math.random()*80)+10,
        category: c.key,
        rating: Math.round((Math.random()*1.5+3.6)*10)/10,
        reviews: Math.floor(Math.random()*1900)+50
      });
    }
  }
  await Product.deleteMany({});
  await Product.insertMany(docs);
  console.log("Seeded", docs.length, "products");
  await mongoose.connection.close();
  process.exit(0);
})().catch(e=>{ console.error(e); process.exit(1); });
