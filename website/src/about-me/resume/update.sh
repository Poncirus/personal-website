work_path=$(dirname $0)
rm ${work_path}/*.jpg ${work_path}/*.pdf
wget http://github.com/Poncirus/Resume/raw/master/resume.jpg -O ${work_path}/resume.jpg &
wget http://github.com/Poncirus/Resume/raw/master/resume.pdf -O ${work_path}/resume.pdf &
wget http://github.com/Poncirus/Resume/raw/master/resume-cn.jpg -O ${work_path}/resume-cn.jpg &
wget http://github.com/Poncirus/Resume/raw/master/resume-cn.pdf -O ${work_path}/resume-cn.pdf &