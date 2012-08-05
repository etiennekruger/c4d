import urllib2
import urlparse
import bs4
import sys
from md5 import md5

# Example urls
url = "http://www.iol.co.za/news/crime-courts/we-will-shut-down-cape-ancyl-1.1355605#.UB33V7Qti0x"
url = "http://www.news24.com/SouthAfrica/News/Gauteng-cops-ready-for-day-5-of-protests-20120803"

class ImgGrabber(object):
    def __init__(self, url):
        self.url = url

    def _grabpage(self):
        return urllib2.urlopen(self.url).read()

    def _getimg(self):
        img_url = urlparse.urljoin(url, self._getimgurl())
        img_file = open(self._getimgname(), "wb")
        img_file.write(urllib2.urlopen(img_url).read())
        img_file.close()

    def _getimgname(self):
        return md5(self.url).hexdigest() + ".jpg"

    def downloadimage(self):
        self._getimg()
        return self._getimgname()

    @staticmethod
    def download(url):
        if "iol.co.za" in url:
            grabber = IOLGrabber(url)
        elif "news24" in url:
            grabber = News24Grabber(url)

        if grabber:
            return grabber.downloadimage()


class IOLGrabber(ImgGrabber):
    def _getimgurl(self):
        html = self._grabpage()
        soup = bs4.BeautifulSoup(html)

        div = soup.find_all(attrs={"class" : "aticle_video" })
        if len(div) == 0:
            return None

        img = div[0].find_all("img")
        if len(img) == 0:
            return None

        img = img[0]
        return img["src"]

class News24Grabber(ImgGrabber):
    def _getimgurl(self):
        html = self._grabpage()
        soup = bs4.BeautifulSoup(html)

        div = soup.find_all(attrs={"id" : "article_feature" })
        if len(div) == 0:
            return None

        img = div[0].find_all("img")
        if len(img) == 0:
            return None

        img = img[0]
        return img["src"]

if __name__ == "__main__":
    url = sys.argv[1]
    ImgGrabber.download(url)
