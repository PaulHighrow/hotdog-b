const axios = require("axios");
require("dotenv").config();
const { getToken } = require("../../services/tokensServices");
const { newTranslationLead } = require("../../services/leadsServices");

axios.defaults.baseURL = process.env.BASE_URL;

const postTranslationLead = async (req, res, _) => {
  const postRequest = [
    {
      name: `Website Lead ${req.body.name}`,
      // tried to set lead status, but due to automated lead categorizing it does not work properly
      // status_id: 55468371,
      pipeline_id: 6542135,
      custom_fields_values: [
        {
          field_id: 556518,
          field_name: "utm_content",
          values: [
            {
              value: req.body.utm_content || '',
            },
          ],
        },
        {
          field_id: 556520,
          field_name: "utm_medium",
          values: [
            {
              value: req.body.utm_medium || '',
            },
          ],
        },
        {
          field_id: 556522,
          field_name: "utm_campaign",
          values: [
            {
              value: req.body.utm_campaign || '',
            },
          ],
        },
        {
          field_id: 556524,
          field_name: "utm_source",
          values: [
            {
              value: req.body.utm_source || '',
            },
          ],
        },
        {
          field_id: 556526,
          field_name: "utm_term",
          values: [
            {
              value: req.body.utm_term || '',
            },
          ],
        },
        {
          field_id: 556528,
          field_name: "utm_referrer",
          values: [
            {
              value: req.body.utm_referrer || '',
            },
          ],
        },
      ],
      _embedded: {
        tags: [{ name: "Лід з сайту" }, {name: `Переклад ${req.body.lang}`}],
        contacts: [
          {
            name: req.body.name,
            custom_fields_values: [
              {
                field_id: 556510,
                field_name: "Work phone",
                values: [
                  {
                    value: req.body.phone,
                    enum_code: "WORK",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ];

  const lead = {
    name: req.body.name,
    phone: req.body.phone,
    lang: req.body.lang,
    utm_content: req.body.utm_content,
    utm_medium: req.body.utm_medium,
    utm_campaign: req.body.utm_campaign,
    utm_source: req.body.utm_source,
    utm_term: req.body.utm_term,
    utm_referrer: req.body.utm_referrer,
    referrer: req.body.referrer,
    gclientid: req.body.gclientid,
    gclid: req.body.gclid,
    fbclid: req.body.fbclid,
  };

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${currentToken[0].access_token}`;
    await axios.post("api/v4/leads/complex", postRequest);
    return res.status(201).json(await newTranslationLead(lead));
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = postTranslationLead;
