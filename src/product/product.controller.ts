import { Controller, Post, Get, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import {CreateProductDTO} from './dto/product.dto'
import {ProductService} from './product.service'

@Controller('product')
export class ProductController {

    constructor( private productService: ProductService){}


    @Post('/create')
    async createPost(@Res()res, @Body() createProductDTO: CreateProductDTO){

        const product = await this.productService.createProduct(createProductDTO)

        return res.status(HttpStatus.OK).json({
            message: 'Product successfully created',
            product
        })
    }

    @Get('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts()
        res.status(HttpStatus.OK).json({
            message: 'List products',
            products
        })
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.getProduct(productID)
        if(!product) throw new NotFoundException('Product does not exists')
        return res.status(HttpStatus.OK).json(product)

    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID){
         const productDelete = await this.productService.deleteProduct(productID)

        if(!productDelete) throw new NotFoundException('Product does not exists')
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted successfully',
            productDelete
        })
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID){
        const updateProduct = await this.productService.updateProduct(productID, createProductDTO)
        if(!updateProduct) throw new NotFoundException('Product does not exists')
        return res.status(HttpStatus.OK).json({
            message: 'Product updated successfully', 
            updateProduct
        })
    }
}
