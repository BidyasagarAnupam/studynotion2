const Category = require('../models/Category');
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
// create handler function
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            });
        }
        // create entry in db
        const CategoryDetails = await Category.create({
            name: name,
            description: description
        });
        console.log(CategoryDetails);

        // return res
        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get all Categorys
exports.showAllCategories = async (req, res) => {
    try {

        const allCategorys = await Category.find({});

        res.status(200).json({
            success: true,
            message: "All Categorys return successfully",
            data: allCategorys
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// categories page details
exports.categoryPageDetails = async (req, res) => {
    try {
        // get category id
        const { categoryId } = req.body;
        // get course for specified category Id
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            }).exec();
        // validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not foundd"
            });
        }

        // Handle the case when there are no course
        if (selectedCategory.course.length === 0) {
            console.log("No course found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No course found for the selected category.",
            })
        }



        // get course for different categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "course",
                match: { status: "Published" },
            })
            .exec()
        // get top 10 selling course
        // TODO HW write it on your own
        // Get top-selling course across all categories
        const allCategories = await Category.find().populate({
            path: "course",
            match: { status: "Published" },
            populate: {
                path: "instructor",
            },
        })
            .exec()
        const allcourse = allCategories.flatMap((category) => category.course);
        const mostSellingcourse = allcourse
            .sort((a, b) => b.sold - a.sold) // ! what is sold
            .slice(0, 10);

        // return
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                // TODO topSellingcourse
                mostSellingcourse
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}