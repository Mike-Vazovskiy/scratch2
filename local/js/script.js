

$(document).ready(function() {
    var n = 10;


    $('.footer__info_btn').on('click', function(e) {
        e.preventDefault();
        if ($('.footer__info_text').hasClass('show')) {
            $('.footer__info_btn').html('Mehr lesen');
            $(this).closest('.footer__info').find('.footer__info_text').removeClass('show');
        } else {
            $('.footer__info_btn').html('Weniger lesen');
            $(this).closest('.footer__info').find('.footer__info_text').addClass('show');
        }
    });

    let btnToCards = $('.header__gif')
    btnToCards.click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#cards').offset().top
        }, 500);
    });
    let sumDollars = 850;
    function watchDollars(element) {
        let dollars = 850,
            progress = $('.dots');
        progress.html('');
        $('.main__cards_card.opened').each(function(){
            let thatOpenedCard = $(this),
                openedCardCount = thatOpenedCard.data('price');
            dollars = dollars + openedCardCount;
        })
        $('.count-price').text(dollars);
        let circlesCounter = Math.floor(dollars/100);
        sumDollars = dollars;
        for (var i = 0; i < circlesCounter; i++) {
            progress.append('<div class="dot"></div>')
        }      
    }

    function watchPopups(element) {
        let allCardsOpened = true;
        $('.main__cards_card').each(function() {
            if (!$(this).hasClass('opened')) {
                allCardsOpened = false;
                return false; // Выходим из цикла, как только найдена закрытая карточка
            }
        });
    
        if (allCardsOpened) {
            $('.modal.win').show();
            $('.modal').not('.modal.win').hide(); // Скрываем все модальные окна, кроме .modal.win
            $('.modal').css('background', 'rgba(0, 0, 0, 0.8)');
            $('.modal').css('display', 'flex');
        }
    }
    $(window).on('load', function(){
        $('.main__cards_card').each(function(i){
            let thatCard = $(this);
        
            const scContainer = thatCard[0];
            const sc = new ScratchCard(scContainer, {
                scratchType: SCRATCH_TYPE.LINE,
                containerWidth: scContainer.offsetWidth,
                containerHeight: 300,
                imageBackgroundSrc: './local/images/scratchMain.webp',
                imageForwardSrc: './local/images/scratchImg.png',
                htmlBackground: '',
                clearZoneRadius: 40,
                nPoints: 0,
                pointSize: 0,
                
                callback: function () {
                    thatCard.addClass('opened');
                    watchDollars(thatCard);
                    watchPopups(thatCard);
                }
            })
            sc.init();
        })
    })
});







