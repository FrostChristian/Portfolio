<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Christian Frost, Gamedesign and Developer. Contact Me Here!">
    <meta name="msapplication-TileColor" content="#3578ae">
    <meta name="msapplication-config" content="/resources/img/favicons/browserconfig.xml">
    <meta name="theme-color" content="#3578ae">
    <link rel="apple-touch-icon" sizes="180x180" href="/resources/img/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/resources/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/resources/img/favicons/favicon-16x16.png">
    <link rel="manifest" href="/resources/img/favicons/site.webmanifest">
    <link rel="mask-icon" href="/resources/img/favicons/safari-pinned-tab.svg" color="#3578ae">
    <link rel="shortcut icon" href="/resources/img/favicons/favicon.ico">
    <link rel="stylesheet" type="text/css" href="vendor/css/normalize.css" />
    <link rel="stylesheet" type="text/css" href="vendor/css/1.3_grid.css" />
    <link rel="stylesheet" type="text/css" href="resources/css/style.css" />
    <link rel="stylesheet" type="text/css" href="resources/css/queries.css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,300&display=swap" rel="stylesheet">
    <title lang="en">Christian Frost - Contact Form</title>
</head>

<body id="page-top" class="nav-closed">
    <header>
        <nav class="section-nav">
            <div class="section-nav__hero">
                <a href="index.html"><img src="resources/img/logo_v1.svg" alt="Brand_v1" class="section-nav__brand"></a>
            </div>
            <div class="section-nav__mobile">
                <button class="nav-toggle" aria-label="toggle navigation">
                    <span class="hamburger"></span>
                </button>
            </div>
            <div class="section-nav__main js--main-nav">
                <ul class="section-nav__rest">
                    <li><a lang="en" href="/about.html"></a></li>
                    <li><a lang="en" href="/portfolio.html">Portfolio</a></li>
                </ul>
                <div class="section-nav__contact">
                    <p lang="en" class="btn-dummy-full">Contact Me</p>
                </div>
            </div>
        </nav>
    </header>
    <section class="section-contact-form">
        <div>
            <div class="row">
                <div class="contact-form-header is-centered">
                    <h5 lang="en">Say Hello, I’m happy to hear from you!</h5>
                </div>
            </div>
            <div class="contact-form-body">
                <form method="POST" action="resources/php/mail.php" class="contact-form">
                    <div class="row">
                        <div class="row">
                            <div class="col span-1-of-3 has-margin-left">
                                <label lang="en" for="name">Name:</label>
                            </div>
                            <div class="col span-2-of-3">
                                <input type="text" name="name" id="name" placeholder="Name" >
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col span-1-of-3 has-margin-left">
                            <label lang="en" for="email">E-Mail:</label>
                        </div>
                        <div class="col span-2-of-3">
                            <input type="email" name="email" id="email" placeholder="email@gmail.com" >
                        </div>
                    </div>
                    <div class="row">
                        <div class="col span-1-of-3">
                            <label lang="en" for="interest">Interest:</label>
                        </div>
                        <div class="col span-2-of-3">
                            <select name="interest"  id="interest">
                                <option lang="en" value="non-select" disabled selected>Select an option...</option>
                                <option lang="en" value="say-hello">Say Hello</option>
                                <option lang="en" value="portfolio">Portfolio</option>
                                <option lang="en" value="job">Job</option>
                                <option lang="en" value="bug-improvements">Bugs / Improvements</option>
                                <option lang="en" value="other-interest">Other Interest...</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col span-1-of-3">
                            <label lang="en">Drop me a line:</label>
                        </div>
                        <div class="col span-2-of-3">
                            <textarea name="message"  placeholder="Hi, ..."></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col span-1-of-3">
                            <label>&nbsp;</label>
                        </div>
                        <div class="col span-2-of-3">
                        <div class="g-recaptcha" data-sitekey="6Le7A38aAAAAAPcsgSQK3JuicWhu9NfuIEYws2x8"></div>
                            <button lang="en" name="submit_form" class="btn btn-submit" type="submit">Send it!</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <footer class="section-footer is-centered">
        <div class="row">
            <div class="col span-1-of-2">
                <ul class="footer-social">
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/christian-frost-6a18571aa/"><img src="vendor/img/logo-linkedin.svg" alt="LinkedIn Logo"></a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/FrostChristian"><img src="vendor/img/logo-github.svg" alt="GitHub Logo"></a></li>
                    <li><a href="mailto:christian.frost.work@gmail.com?subject=Hi%20Chris!"><img src="vendor/img/mail-outline.svg" alt="Mail me Logo"></a></li>
                </ul>
            </div>
            <div class="col span-1-of-2">
                <div class="footer-language">
                    <ul>
                        <li>
                            <p lang="en">Language</p>
                        </li>
                        <li><img src="vendor/img/language-outline.svg" alt="Language symbol"></li>
                        <li><select id="lang-switcher" class="form-control" onchange="selectLanguage(this);">
                                <option lang="en" value="en">English</option>
                                <option lang="en" value="de">German</option>
                            </select></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <ul class="footer-copyright is-centered">
                <li>
                    <p lang="en">Handmade by me 2021</p>
                </li>
                <li>
                    <p>&copy;</p>
                </li>
            </ul>
        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha384-ZvpUoO/+PpLXR1lu4jmpXWu80pZlYUAfxl5NsBMWOEPSjUn/6Z/hRTt8+pR6L4N2" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js" integrity="sha256-9uAoNWHdszsUDhSXf/rVcWOqKPfi5/8V5R4UdbZle2A=" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/503e25a38a.js" crossorigin="anonymous"></script>
    <script src="vendor/js/jquery-sls.js"></script>
    <script src="vendor/js/jquery.waypoints.min.js"></script>
    <script src="resources/js/script.js"></script>
    
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>

</body>

</html>