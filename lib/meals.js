import fs from 'node:fs'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'


const db = sql('meals.db')

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // throw new Error('loading meals fails!')
    return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true })
    meal.instuctions = xss(meal.instuctions)

    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}.${extension}`

    // const file = `https://api.cloudinary.com/v1_1/dcm19ly0d/image/upload`
    // console.log(file)

    try {

        // const result = await cloudinary.uploader.upload(`${file}/${fileName}`, {
        //     folder: 'Dashboard/react-nextjs-foodies-store',
        //     public_id: meal.slug,
        // })

        // console.log(result)

        // meal.image = result.secure_url

        const stream = fs.createWriteStream(`public/images/${fileName}`)
        const bufferedImage = await meal.image.arrayBuffer()
        stream.write(Buffer.from(bufferedImage), (error) => {
            if (error) {
                throw new Error('Saving image failed!')
            }
        })

        console.log(meal)

        meal.image = `/images/${fileName}`
        db.prepare(`
        INSERT INTO meals 
        (slug, title, image, summary, instructions, creator, creator_email)
        VALUES (
            @slug,
            @title,
            @image,
            @summary,
            @instructions,
            @creator,
            @creator_email
        )
        `).run(meal)
    } catch (error) {
        console.log(error)
    }
}