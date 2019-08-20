function injectOffer() {
  const items = [...document.querySelectorAll('.master__item')];
  const fragment = document.createDocumentFragment();
  const pagesContainer = document.querySelector('.js-pages-container');
  const newspaperTitle = document.querySelector('.js-newspaper-title-array');
  const selectedNewspaper = newspaperTitle.innerText == '' ? [] : JSON.parse(newspaperTitle.innerText);
  const partnerLogos = document.querySelector('.js-partner-logos-array');
  const selectedParnterLogos = partnerLogos.innerText == '' ? [] : JSON.parse(partnerLogos.innerText);
  const selectedParnterLogosMaxCheck = selectedParnterLogos.length > 4 ? ' overflow' : '';
  const globalTerms = document.querySelector('.js-global-terms-src').innerText;
  const newspaperObj = {
    'herald-sun': {
      'title': 'Herald Sun',
      'website': 'heraldsun.com.au/rewards',
      'logo': 'https://files.outfit.io/media_library_items/115422/Logo%25201.svg',
    },
    'daily-telegraph': {
      'title': 'Daily Telegraph',
      'website': 'dailytelegraph.com.au/rewards',
      'logo': 'https://files.outfit.io/media_library_items/115680/Daily%2520and%2520Rewards%2520Logo.svg',
    },
    'courier-mail': {
      'title': 'Courier Mail',
      'website': 'couriermail.com.au/rewards',
      'logo': 'https://files.outfit.io/media_library_items/115679/Courier%2520and%2520Rewards%2520Logo.svg',
    },
    'the-advertiser': {
      'title': 'The Advertiser',
      'website': 'advertiser.com.au/rewards',
      'logo': 'https://files.outfit.io/media_library_items/115682/Advertiser%2520and%2520Rewards%2520Logo.svg',
    },
  }
  
  if ( selectedNewspaper.length == 0 ) {
    clearDiv(pagesContainer);
    injectPopup(pagesContainer);
    return;
  }
  
  const partnerLogosHTML = selectedParnterLogos.map(partnerLogo => {
    let logoImg;
    
    switch(partnerLogo) {
      case 'brisbane-festival':
        logoImg = 'https://files.outfit.io/media_library_items/114117/Brisbane%2520festival%2520Logo.svg';
        break;
      case 'foxtel-now':
        logoImg = 'https://files.outfit.io/media_library_items/114119/Foxtel%2520now%2520logo.svg';
        break;
      case 'lord-lygon':
        logoImg = 'https://files.outfit.io/media_library_items/115418/Logo%2520Lord%2520Lygon.svg';
        break;        
      case 'nouvelle-caledone':
        logoImg = 'https://files.outfit.io/media_library_items/114122/Nouvelle%2520Logo.svg';
        break;                
      case 'aircalin':
        logoImg = 'https://files.outfit.io/media_library_items/114121/Aircalin%2520Logo.svg';
        break;                        
      case 'chateau-royale':
        logoImg = 'https://files.outfit.io/media_library_items/114116/Chateau%2520Royal%2520Logo.svg';
        break;                                
      case 'white-night-melbourne':
        logoImg = 'https://files.outfit.io/media_library_items/115417/White%2520night%2520logo.svg';
        break;                                        
      case 'zagame’s-house':
        logoImg = 'https://files.outfit.io/media_library_items/115421/Logo%2520Zagames%2520House.svg';
        break;
    }
    
    return `<div class="partnerLogo"><img src="${logoImg}" class="partnerLogo__image"></div>`;
  }).join('');

  clearDiv(pagesContainer) 

  selectedNewspaper.forEach(newspaper => {
    const { title, website, logo } = newspaperObj[newspaper];
    
    if ( items.length == 1 ) {
      const page = generatePage();
      const item = items[0];
      
      const image = item.querySelector('.js-offer-image-src').innerHTML;
      const heading = item.querySelector('.js-offer-heading-src').innerText;
      const bodyText = item.querySelector('.js-offer-body-text-src').innerText.replace(/{newspaper title}/gi, title);
      const bodyTextEmptyCheck = ( bodyText == '' ) ? ' u-hide' : '';
      const ticketDetails = item.querySelector('.js-offer-ticket-details-src').innerText;
      const terms = item.querySelector('.js-offer-terms-src').innerText;
      const conditionsLabel = item.querySelector('.js-offer-conditions-label-src').innerText;      

      page.innerHTML = `
    <div class="bleed" style="position: absolute; top: -3mm; right: -3mm; bottom: -3mm; left: -3mm;">
        <div class="container fit">
          <div class="body">
            <div class="body__inner">
              <div class="side">
                <div class="offer__image js-offer-image-target"><div class="reposition-fix">${image}</div></div><!--offer__image-->
              </div><!--side-->

              <div class="main main--primary">
                <div class="offer__body">
                  <div class="offer__heading" data-max-line="3">${heading}</div><!--offer__heading-->
                  <div class="u-flex-1 u-flex-column u-flex-justify-end">
                    <div class="offer__note">${conditionsLabel}</div><!--offer__note-->
                    <div class="offer__text offer__text--primary js-newspaper-title-replace${bodyTextEmptyCheck}" data-max-height="dynamic">
                      ${bodyText}
                    </div><!--offer__text-->
                  </div><!-- end u-flex-1 -->
                  <div class="offer__text offer__text--secondary">
                    ${ticketDetails}
                    <div class="rewardIcon">Rewards Members can enter now at <span class="u-bold">${website}</span></div><!--offer__text-->
                  </div><!--offer__text-->

                </div><!--offer__body-->
                <div class="offer__footer">
                  <img class="logo" src="${logo}"><!--logo-->
                  <div class="partnerLogo__container${selectedParnterLogosMaxCheck}">
                    ${partnerLogosHTML}
                  </div><!-- end partnerLogo__container -->
                </div><!--offer__footer-->
              </div><!--main-->

            </div><!--body__inner-->
          </div><!--body-->

          <div class="footer footer--primary">
            <div class="terms" data-max-line="3">${terms}</div><!--terms-->
          </div><!--footer-->

        </div><!--container fit-->
    </div><!--bleed-->
`;
      fragment.appendChild(page);
    } else {
      const page = generatePage();
      
      const blocksHTML = items.map(item => {
        const image = item.querySelector('.js-offer-image-src').innerHTML;
        const heading = item.querySelector('.js-offer-heading-src').innerText;
        const bodyText = item.querySelector('.js-offer-body-text-src').innerText.replace(/{newspaper title}/gi, title);
        const ticketDetails = item.querySelector('.js-offer-ticket-details-src').innerText;
        const terms = item.querySelector('.js-offer-terms-src').innerText;
        const conditionsLabel = item.querySelector('.js-offer-conditions-label-src').innerText;
        
        return `
        <div class="offerBlock">
          <div class="offerBlock__heading">${heading}</div><!--offerBlock__heading-->
          <div class="offerBlock__note">${conditionsLabel}</div><!--offerBlock__note-->
          <div class="offerBlock__image js-offer-image-target"><div class="reposition-fix">${image}</div></div><!--offerBlock__image-->
          <div class="offerBlock__content">
            <div data-max-height="dynamic">${bodyText} ${ticketDetails}</div>
          </div><!--offerBlock__content-->
        </div><!--offerBlock-->
`;
      }).join('');
      
      page.innerHTML = `
      <div class="bleed" style="position: absolute; top: -3mm; right: -3mm; bottom: -3mm; left: -3mm;">
        <div class="container fit">
          <div class="body">
            <div class="body__inner">
              <div class="side side--secondary">
                <div class="side__section">
                  <div class="offer__heading offer__heading--alt" data-max-line="2">We're for giving<br><span class="u-pink">members more.</span></div><!--offer__heading-->
                  <div class="offer__note offer__note--alt" data-max-line="2">More giveaways, discounts<br> and exclusive offers.</div><!--offer__note-->
                </div><!--side__section-->
                <div class="side__section side__section--secondary">
                  <div class="copy copy--primary" data-max-line="2">+Rewards Members can view now at</div><!--copy-->
                  <div class="copy copy--secondary"> ${website}</div><!--copy-->
                  <div class="logo__container">
                    <img class="logo" src="${logo}" />
                  </div><!--logo__container-->
                </div><!--side__section-->
              </div><!--side-->
              <div class="main main--secondary">
                <div class="offerBlock__container">
                    ${blocksHTML}
                </div><!--offerBlock__container-->
              </div><!--main-->
            </div><!--body__inner-->
          </div><!--body-->
          <div class="footer footer--secondary">
            <div class="terms" data-max-line="6">${globalTerms}</div><!--terms-->
          </div><!--footer-->
        </div><!--container fit-->
      </div><!-- end bleed -->
`;
      fragment.appendChild(page);
    }
  });        

  pagesContainer.appendChild(fragment);
  
  // Setting the correct size of the source element so it will be presented properly in the reposition tool
  const imageTargetInfo = document.querySelector('.js-offer-image-target').getBoundingClientRect();
  const imageSrc = document.querySelectorAll('.js-offer-image-src');
  
  imageSrc.forEach(src => {
    src.style.width = imageTargetInfo.width + 'px';
    src.style.height = imageTargetInfo.height + 'px';
  });
}

// Helper functions

function clearDiv(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function generatePage() {
  const page = document.createElement('div');
  page.classList.add('page');
  page.style.cssText = 'overflow: hidden; position: relative; height: 100vh; width: 100vw;';

  return page;
}

function injectPopup(container) {
  const popup = document.createElement('div');
  popup.style.cssText = 'position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);width: 68%;padding: 4%;font-size: 0.8rem;color: red;background: #fff;border: 5px solid red;text-align: center;z-index: 999;';
  popup.innerHTML = 'Please select at least one newspaper title.'
  container.appendChild(popup);
}

// Initalizing the function

injectOffer();
