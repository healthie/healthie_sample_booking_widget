# The Healthie Booking Widget

This is an example of a booking widget built on top of [the Healthie API](https://docs.gethealthie.com).
The widget lets a client select an appointment type, find an available appointment slot, provide personal info, and book the appointment.

![demo](https://user-images.githubusercontent.com/1649883/105534553-461ae080-5cb3-11eb-85d3-91690ca9901d.png)

# Usage

First, make sure you have a Healthie API key and account. If you don't have one, you can go to https://gethealthie.com/api to request access

Second, clone the repository to your computer, and install dependencies.

```bash
git clone https://github.com/healthie/healthie_sample_booking_widget.git
cd healthie_widget
npm install
```

Third, adjust config options in [App.tsx](https://github.com/healthie/healthie_sample_booking_widget/blob/master/src/App.tsx). They can either be set directly in the code, or passed in via URL params. 

To run the project locally, just do

```bash
npm start
```
# Deploying

By default, the root URL points to Healthie's sandbox API servers. If you want to run this widget against your production instance, make sure to adjust src/config/rootUrl.ts

When you are ready to deploy, you can run

```bash
npm build
```


This will generate a hostable build that can be hosted with any static website host.
We really like Netlify and S3/Cloudfront ourselves.

## Limitations

This booking widget is meant to be a simple example and does not support all different Healthie account settings.
It has simplified error handling (via Javascript alerts).  


## Support
- Our website: https://gethealthie.com/
- For public issues and bugs please use the GitHub Issues Page.
- For enquiries and private issues reach out to us at hello@gethealthie.com

### Submitting a PR

We welcome any contributions! Please create an issue before submitting a pull request.

When creating a pull request, be sure to include a screenshot! 🎨

## License

MIT © Healthie Inc











