'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">js_bank documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-799a0f0e443f9be14572e7db769aeeb2c981067dc6459668462ed75efe974ee5740a18e4248db16919dff0688c551474d77eeeeec45e5842b2cc8da7efb84b17"' : 'data-bs-target="#xs-controllers-links-module-AppModule-799a0f0e443f9be14572e7db769aeeb2c981067dc6459668462ed75efe974ee5740a18e4248db16919dff0688c551474d77eeeeec45e5842b2cc8da7efb84b17"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-799a0f0e443f9be14572e7db769aeeb2c981067dc6459668462ed75efe974ee5740a18e4248db16919dff0688c551474d77eeeeec45e5842b2cc8da7efb84b17"' :
                                            'id="xs-controllers-links-module-AppModule-799a0f0e443f9be14572e7db769aeeb2c981067dc6459668462ed75efe974ee5740a18e4248db16919dff0688c551474d77eeeeec45e5842b2cc8da7efb84b17"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-799a0f0e443f9be14572e7db769aeeb2c981067dc6459668462ed75efe974ee5740a18e4248db16919dff0688c551474d77eeeeec45e5842b2cc8da7efb84b17"' : 'data-bs-target="#xs-injectables-links-module-AppModule-799a0f0e443f9be14572e7db769aeeb2c981067dc6459668462ed75efe974ee5740a18e4248db16919dff0688c551474d77eeeeec45e5842b2cc8da7efb84b17"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-799a0f0e443f9be14572e7db769aeeb2c981067dc6459668462ed75efe974ee5740a18e4248db16919dff0688c551474d77eeeeec45e5842b2cc8da7efb84b17"' :
                                        'id="xs-injectables-links-module-AppModule-799a0f0e443f9be14572e7db769aeeb2c981067dc6459668462ed75efe974ee5740a18e4248db16919dff0688c551474d77eeeeec45e5842b2cc8da7efb84b17"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-10c751141a915d27fba277928e28ec837a846178847fbdaa8d9313b2776b16c8674859eb7cfa5d2367448ffb2da81dc6fdc1ee333001111a723582bb8ebaf35e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-10c751141a915d27fba277928e28ec837a846178847fbdaa8d9313b2776b16c8674859eb7cfa5d2367448ffb2da81dc6fdc1ee333001111a723582bb8ebaf35e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-10c751141a915d27fba277928e28ec837a846178847fbdaa8d9313b2776b16c8674859eb7cfa5d2367448ffb2da81dc6fdc1ee333001111a723582bb8ebaf35e"' :
                                            'id="xs-controllers-links-module-AuthModule-10c751141a915d27fba277928e28ec837a846178847fbdaa8d9313b2776b16c8674859eb7cfa5d2367448ffb2da81dc6fdc1ee333001111a723582bb8ebaf35e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-10c751141a915d27fba277928e28ec837a846178847fbdaa8d9313b2776b16c8674859eb7cfa5d2367448ffb2da81dc6fdc1ee333001111a723582bb8ebaf35e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-10c751141a915d27fba277928e28ec837a846178847fbdaa8d9313b2776b16c8674859eb7cfa5d2367448ffb2da81dc6fdc1ee333001111a723582bb8ebaf35e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-10c751141a915d27fba277928e28ec837a846178847fbdaa8d9313b2776b16c8674859eb7cfa5d2367448ffb2da81dc6fdc1ee333001111a723582bb8ebaf35e"' :
                                        'id="xs-injectables-links-module-AuthModule-10c751141a915d27fba277928e28ec837a846178847fbdaa8d9313b2776b16c8674859eb7cfa5d2367448ffb2da81dc6fdc1ee333001111a723582bb8ebaf35e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/KakaoAuthStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KakaoAuthStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalAuthStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalAuthStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TokenStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BankModule.html" data-type="entity-link" >BankModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BankModule-c9180f3f43125fc7025c3cd7ce29ad362581c177ac715b9e43631cc050b2bbd2ef2f6fc4d2d54452d4af76a9d13f7c592347394a58ca3fb1a69d2e15f1f6c5fa"' : 'data-bs-target="#xs-controllers-links-module-BankModule-c9180f3f43125fc7025c3cd7ce29ad362581c177ac715b9e43631cc050b2bbd2ef2f6fc4d2d54452d4af76a9d13f7c592347394a58ca3fb1a69d2e15f1f6c5fa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BankModule-c9180f3f43125fc7025c3cd7ce29ad362581c177ac715b9e43631cc050b2bbd2ef2f6fc4d2d54452d4af76a9d13f7c592347394a58ca3fb1a69d2e15f1f6c5fa"' :
                                            'id="xs-controllers-links-module-BankModule-c9180f3f43125fc7025c3cd7ce29ad362581c177ac715b9e43631cc050b2bbd2ef2f6fc4d2d54452d4af76a9d13f7c592347394a58ca3fb1a69d2e15f1f6c5fa"' }>
                                            <li class="link">
                                                <a href="controllers/BankController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BankModule-c9180f3f43125fc7025c3cd7ce29ad362581c177ac715b9e43631cc050b2bbd2ef2f6fc4d2d54452d4af76a9d13f7c592347394a58ca3fb1a69d2e15f1f6c5fa"' : 'data-bs-target="#xs-injectables-links-module-BankModule-c9180f3f43125fc7025c3cd7ce29ad362581c177ac715b9e43631cc050b2bbd2ef2f6fc4d2d54452d4af76a9d13f7c592347394a58ca3fb1a69d2e15f1f6c5fa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BankModule-c9180f3f43125fc7025c3cd7ce29ad362581c177ac715b9e43631cc050b2bbd2ef2f6fc4d2d54452d4af76a9d13f7c592347394a58ca3fb1a69d2e15f1f6c5fa"' :
                                        'id="xs-injectables-links-module-BankModule-c9180f3f43125fc7025c3cd7ce29ad362581c177ac715b9e43631cc050b2bbd2ef2f6fc4d2d54452d4af76a9d13f7c592347394a58ca3fb1a69d2e15f1f6c5fa"' }>
                                        <li class="link">
                                            <a href="injectables/BankService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataBaseModule.html" data-type="entity-link" >DataBaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-ebe2f505962a4962fccf706544f23c5d2136b47625dd652934e7444c803ec9ea767ff0d8ff6d92ae5f31b58556d3debb0fd5130d02d6b1488918a71c02cc9c39"' : 'data-bs-target="#xs-injectables-links-module-MailModule-ebe2f505962a4962fccf706544f23c5d2136b47625dd652934e7444c803ec9ea767ff0d8ff6d92ae5f31b58556d3debb0fd5130d02d6b1488918a71c02cc9c39"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-ebe2f505962a4962fccf706544f23c5d2136b47625dd652934e7444c803ec9ea767ff0d8ff6d92ae5f31b58556d3debb0fd5130d02d6b1488918a71c02cc9c39"' :
                                        'id="xs-injectables-links-module-MailModule-ebe2f505962a4962fccf706544f23c5d2136b47625dd652934e7444c803ec9ea767ff0d8ff6d92ae5f31b58556d3debb0fd5130d02d6b1488918a71c02cc9c39"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-0d0006676078d9ac987c4081096cceff5bcadccda319d42c7619595e80c5714c6706287ceb4862b31bb28c781284c1051441ca8fd33cc02ae334187eea97d2da"' : 'data-bs-target="#xs-controllers-links-module-UserModule-0d0006676078d9ac987c4081096cceff5bcadccda319d42c7619595e80c5714c6706287ceb4862b31bb28c781284c1051441ca8fd33cc02ae334187eea97d2da"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-0d0006676078d9ac987c4081096cceff5bcadccda319d42c7619595e80c5714c6706287ceb4862b31bb28c781284c1051441ca8fd33cc02ae334187eea97d2da"' :
                                            'id="xs-controllers-links-module-UserModule-0d0006676078d9ac987c4081096cceff5bcadccda319d42c7619595e80c5714c6706287ceb4862b31bb28c781284c1051441ca8fd33cc02ae334187eea97d2da"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-0d0006676078d9ac987c4081096cceff5bcadccda319d42c7619595e80c5714c6706287ceb4862b31bb28c781284c1051441ca8fd33cc02ae334187eea97d2da"' : 'data-bs-target="#xs-injectables-links-module-UserModule-0d0006676078d9ac987c4081096cceff5bcadccda319d42c7619595e80c5714c6706287ceb4862b31bb28c781284c1051441ca8fd33cc02ae334187eea97d2da"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-0d0006676078d9ac987c4081096cceff5bcadccda319d42c7619595e80c5714c6706287ceb4862b31bb28c781284c1051441ca8fd33cc02ae334187eea97d2da"' :
                                        'id="xs-injectables-links-module-UserModule-0d0006676078d9ac987c4081096cceff5bcadccda319d42c7619595e80c5714c6706287ceb4862b31bb28c781284c1051441ca8fd33cc02ae334187eea97d2da"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BankController.html" data-type="entity-link" >BankController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Bank.html" data-type="entity-link" >Bank</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBankDto.html" data-type="entity-link" >CreateBankDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBankDto.html" data-type="entity-link" >UpdateBankDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BankService.html" data-type="entity-link" >BankService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthGuard.html" data-type="entity-link" >GoogleAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthStrategy.html" data-type="entity-link" >GoogleAuthStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KakaoAuthGuard.html" data-type="entity-link" >KakaoAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KakaoAuthStrategy.html" data-type="entity-link" >KakaoAuthStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthStrategy.html" data-type="entity-link" >LocalAuthStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenGuard.html" data-type="entity-link" >TokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenStrategy.html" data-type="entity-link" >TokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/RequestUserInterface.html" data-type="entity-link" >RequestUserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenInterface.html" data-type="entity-link" >TokenInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});