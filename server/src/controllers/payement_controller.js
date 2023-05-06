import Stripe from 'stripe'

const stripe = new Stripe(process.env.SECRET_KEY);

export async function paymentCardNow(req, res){
    let status, error;
    const { token, amount } = req.body
    try {
        await stripe.charges.create({
            source: token.id,
            amount,
            currency:'usd'
        })
        status = "success"
    } catch (error) {
        console.log(error)
        status = "Failure"
    }
    res.json({status})
}