let net;

$(document).ready(function () {
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').attr('src', e.target.result);
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });
    $('#btn-predict').click(function () {
      $(this).hide();
      predict();
    });
});

async function predict() {
  $('.loader').show();
  net = await mobilenet.load();
  const imgEl = document.getElementById('imagePreview')
  const result = await net.classify(imgEl);
  $('.loader').hide();
  $('#result').fadeIn(600);
  $('#result').text(' Result:  ' + result[0].className);
  console.log(result);
}
