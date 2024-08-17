const Product = require('../models/prod');
const Medicine = require('../models/medicines');

const homePageGET= async(req, res,next)=>{
 
    try{
        const products = await Product.find();
        // res.render('layout/user-layout')
        res.render('user/index', {layout:'layout/user-layout',products})
        // res.render('index', {layout:'layout/user-layout'})
        // res.json()
       
    }
    catch(error){

        console.log("Error from homePageGET userController: ", error);
    
        res.redirect('/error-page');
    
      }
}
const categoryProductsGET= async(req, res,next)=>{
    try {
        const cat = req.params.category;
        const no = req.params.pageno;
        const filt = req.params.filter;
        const  a=[];
        for( let i=0; i<5;i++)
        {if(Number(i)===no-1)
         a[i]="active";
        else
          a[i]="inactive";
        }
        if(Number(filt)===0)
        // Query the products collection for products with the specified category
       { const products = await Product.find({ category: cat}).skip((Number(no)-1)*10).limit(10);
       if (products.length === 0) {
            const err='<h2>Not found</h2>'
            return res.render('user/shop',{layout:'layout/user-layout',cat,err,a,no,filt:0});
        } 
        const err=''
      
       return res.render('user/shop',{layout:'layout/user-layout',products,cat,err,a,no,filt:0}); // Send the retrieved products as JSON response
       
    }
    else if(Number(filt)===1)
    { const products = await Product.find({ category: cat}).collation({ locale: 'en', strength: 2 }).sort({name:1}).skip((Number(no)-1)*10).limit(10);
        
        if (products.length === 0) {
            const err='<h2>Not found</h2>'

            return res.render('user/shop',{layout:'layout/user-layout',cat,err,a,no,filt:1});
        }
        const err=""
       return res.render('user/shop',{layout:'layout/user-layout',products,cat,err,a,no,filt:1}); // Send the retrieved products as JSON response
   
    }
    else if(Number(filt)===2)
    { const products = await Product.find({ category: cat}).collation({ locale: 'en', strength: 2 }).sort({name:-1}).skip((Number(no)-1)*10).limit(10);
        
        if (products.length === 0) {
            const err='<h2>Not found</h2>'
           
            return res.render('user/shop',{layout:'layout/user-layout',cat,err,a,no,filt:2});
        }
        const err=""
       return res.render('user/shop',{layout:'layout/user-layout',products,cat,err,a,no,filt:2}); // Send the retrieved products as JSON response
   
    }
    else if(Number(filt)===3)
    { const products = await Product.aggregate([
        {
            $project: {
                id: 1,
                name: 1,
                imageLink:1,
                category:1,
                salePrice:1,
                origPrice:1,
                price: {
                    $cond: {
                        if: { $gt: ["$salePrice", 0] },
                        then: "$salePrice",
                        else: "$origPrice"
                    }
                }
            }
        },
        { $sort: { price: 1 } } // Sort by price in ascending order
    ]).skip((Number(no)-1)*10).limit(4);
        if (products.length === 0) {
            const err='<h2>Not found</h2>'
           
            return res.render('user/shop',{layout:'layout/user-layout',cat,err,a,no,filt:3});
        }
        const err=""
       return res.render('user/shop',{layout:'layout/user-layout',products,cat,err,a,no,filt:3}); // Send the retrieved products as JSON response
   
    }
    else if(Number(filt)===4)
    { const products = await Product.aggregate([
        {
            $project: {
                id:1,
                name: 1,
                imageLink:1,
                category:1,
                salePrice:1,
                origPrice:1,
                price: {
                    $cond: {
                        if: { $gt: ["$salePrice", 0] },
                        then: "$salePrice",
                        else: "$origPrice"
                    }
                }
            }
        },
        { $sort: { price: -1 } } // Sort by price in descending order
    ]).skip((Number(no)-1)*10).limit(4);
        if (products.length === 0) {
            const err='<h2>Not found</h2>'
           
            return res.render('user/shop',{layout:'layout/user-layout',cat,err,a,no,filt:4});
        }
        const err=""
       return res.render('user/shop',{layout:'layout/user-layout',products,cat,err,a,no,filt:4}); // Send the retrieved products as JSON response
       
    }
    else if(Number(filt)===5 )
    { 
        const medicines = await Medicine.find({
    prescription:true}).populate({
        path: 'productId',
        select: 'productId' // Select only the productId field from the related Product collection
    }).skip((Number(no)-1)*10).limit(4);
       
    
const products = medicines.map(medicine =>(new Product({
    name: medicine.productId.name,
    origPrice: medicine.productId.origPrice,
    salePrice: medicine.productId.salePrice,
    category:medicine.productId.category,
    imageLink: medicine.productId.imageLink,
      id:medicine.productId.id
})));
            if (products.length === 0) {
                const err='<h2>Not found</h2>'
               
                return res.render('user/shop',{layout:'layout/user-layout',cat,err,a,no,filt:5});
            }
            const err=""
           return res.render('user/shop',{layout:'layout/user-layout',products,cat,err,a,no,filt:5}); // Send the retrieved products as JSON response
        
        }
         
    
}
    catch(error){

        console.log("Error from homePageGET userController: ", error);
    
        res.redirect('/error-page');
    
      }}
    
const productGET= async(req, res,next)=>{
    try {  const category = req.params.category;
        const id = req.params.id;

        // Retrieve medicine details based on the provided id
        const medicine = await Medicine.findOne({Id:id}).populate('productId').exec();
       
        if (!medicine) {
            return res.render('user/shop-single',{layout: 'layout/user-layout'});
        }

        // Render the page with variables passed to the EJS template
        res.render('user/shop-single', {
            layout: 'layout/user-layout',
            category,
            medicine
        });
    } 
    
    catch(error){

        console.log("Error from homePageGET userController: ", error);
    
        res.redirect('/error-page');
    
      }}
     
module.exports={productGET,homePageGET,categoryProductsGET}