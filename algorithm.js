
function travel_algorithm(category, sub_category)
{
  if (category==="honeymoon")
  {
    if(sub_category==="hilly")
    {
          places = [
            {"price":12000, "img_src":"/places/honeymoon/kodaikanal-city.avif", "place":"Kodaikanal, Tamil Nadu"},
            {"price":14500, "img_src":"/places/honeymoon/Mussoorie_Karan.avif", "place":"Mussoorie, Uttarakhand"},
            {"price":16000, "img_src":"/places/honeymoon/Auli.avif", "place":"Auli, Delhi"},
          ];

          return places;
    }

    else if(sub_category==="beach")
    {
      places = [
        {"price":12000, "img_src":"/places/honeymoon/Goa.jpeg", "place":"Goa"},
        {"price":14500, "img_src":"/places/honeymoon/Kovalam.jpeg", "place":"Kovalam, Kerala"},
        {"price":16000, "img_src":"/places/honeymoon/Havelock.jpeg", "place":"Havelock Island, Andaman and Nicobar Islands"},
      ];

      return places;
    }

    else if(sub_category==="forest")
    {
      places = [
        {"price":12000, "img_src":"/places/honeymoon/Coorg.jpeg", "place":"Coorg, Karnataka"},
        {"price":14500, "img_src":"/places/honeymoon/Wayanad.jpeg", "place":"Wayanad, Kerala"},
        {"price":16000, "img_src":"/places/honeymoon/binsar.jpeg", "place":"Binsar, Uttarakhand"},
      ];

      return places;
    }

  }

  if (category==="pilgrimage")
  {
    if(sub_category==="hilly")
    {
      
        places = [
          {"price":12000, "img_src":"/places/pilgrimage/rishikesh.jpeg", "place":"Rishikesh, Uttarakhand"},
          {"price":14500, "img_src":"/places/pilgrimage/haridwar.jpeg", "place":"Haridwar, Uttarakhand"},
          {"price":16000, "img_src":"/places/pilgrimage/badrinath.jpeg", "place":"Badrinath, Uttarakhand"},
        ];
        return places;
       
    }

    else if(sub_category==="beach")
    {
  
      places = [
        {"price":12000, "img_src":"/places/pilgrimage/kanyakumari.jpeg", "place":"Kanyakumari, Tamil Nadu"},
        {"price":14500, "img_src":"/places/pilgrimage/rameshwaram.jpeg", "place":"Rameshwaram, Tamil Nadu"},
        {"price":16000, "img_src":"/places/pilgrimage/puri.jpeg", "place":"Puri, Odisha"},
      ];
      return places;
    }

    else if(sub_category==="forest")
    {
      places = [
        {"price":12000, "img_src":"/places/pilgrimage/sabarimala.jpeg", "place":"Sabarimala, Kerala"},
        {"price":14500, "img_src":"/places/pilgrimage/Tirupati_Hills.jpeg", "place":"Tirumala Hills, Andhra Pradesh"},
        {"price":16000, "img_src":"/places/pilgrimage/dandakarnya.jpeg", "place":"Dandakaranya"},
      ];
      return places;
    }

  }

  if (category==="wildscapes")
  {
    if(sub_category==="hilly")
    {

          places = [
            {"price":12000, "img_src":"/places/wildscapes/spiti_valley.jpeg", "place":"Spiti Valley, Himachal Pradesh"},
            {"price":14500, "img_src":"/places/wildscapes/valley_of_flowers.jpeg", "place":"Valley of Flowers, Uttarakhand"},
            {"price":16000, "img_src":"/places/wildscapes/tawang.jpeg", "place":"Tawang, Arunachal Pradesh"},
          ];
          return places;
      }

    

    else if(sub_category==="beach")
    {
      places = [
        {"price":12000, "img_src":"/places/wildscapes/andaman_nicobar.jpeg", "place":"Andaman and Nicobar Islands"},
        {"price":14500, "img_src":"/places/wildscapes/gokarna.jpeg", "price":"Gokarna, Karnataka"},
        {"price":16000, "img_src":"/places/wildscapes/Dhanushkodi.jpeg", "place":"Dhanushkodi, Tamil Nadu"},
      ];
      return places;
    }

    else if(sub_category==="forest")
    {
      places = [
        {"price":12000, "img_src":"/places/wildscapes/corbett.jpeg", "place":"Jim Corbett National Park, Uttarakhand"},
        {"price":14500, "img_src":"/places/wildscapes/silent_valley.jpeg", "place":"Silent Valley National Park, Kerala"},
        {"price":16000, "img_src":"/places/wildscapes/dudhwa.jpeg", "place":"Dudhwa National Park, Uttar Pradesh"},
      ];
      return places;
    }

  }
}
