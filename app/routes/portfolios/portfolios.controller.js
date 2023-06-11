const Portfolio = require('@/models/portfolio');
const Image = require('@/models/image');
const { NotFoundException } = require('@/exceptions');

const getPortfolios = ({ id: userId }) => {
    return Portfolio.findAll({
        where: {
            userId,
        },
    });
};

const createPortfolio = ({ id: userId, name, description }) => {
    return Portfolio.create({
        userId,
        name,
        description,
    });
};

const deletePortfolio = async ({ id: userId, portfolioId }) => {
    const isDeleted = await Portfolio.destroy({
        where: {
            id: portfolioId,
            userId,
        },
        individualHooks: true,
    });

    if (!isDeleted) throw new NotFoundException('Portfolio not found');
    return { message: 'Portfolio deleted' };
};

const getPortfolio = async ({ id: userId, portfolioId }) => {
    const portfolio = await Portfolio.findOne({
        where: {
            id: portfolioId,
            userId,
        },
        include: {
            model: Image,
            attributes: {
                exclude: ['portfolioId'],
            },
        },
    }).then(portfolio => portfolio.get());

    if (!portfolio) throw new NotFoundException('Portfolio not found');

    portfolio.Images = portfolio.Images.map(image => ({
        ...image.get(),
        url: `/images/${image.filename}`,
    }));

    return portfolio;
};

module.exports = {
    getPortfolios,
    createPortfolio,
    getPortfolio,
    deletePortfolio,
};
