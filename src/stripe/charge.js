import Stripe from "stripe";
// don't commit your real stripe secret key... use env variables!!
// https://www.leighhalliday.com/secrets-env-vars-nextjs-now
const stripe = new Stripe("pk_test_51L3ElqA2ViOJ9APC3pEByGMiNNF0Ir9FqKERDjIJyz9hw4nv3wOLoOX2w4MqOnDPBW4YdpXnF1ei3kf14nHB76MS00vJ9XmKRe");
// eslint-disable-next-line import/no-anonymous-default-export
export default  async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "GBP",
      description: "Delicious empanadas",
      payment_method: id,
      confirm: true,
    });
    return res.status(200).json({
      confirm: "abc123",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};
